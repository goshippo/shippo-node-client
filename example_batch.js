/**
This example demonstrates how to create, retrieve, and purchase batch shipments
as well as adding and removing shipments from a batch
**/


// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');

//Maximum time we'll wait for batch to clear
const BATCH_WAIT_TIMEOUT = 10000;
const POLLING_INTERVAL = 1000;

// example Batch object for batch shipment creation
var myBatch = {
  "default_carrier_account": "<YOUR_USPS_ACCOUNT_OBJECT_ID>",
  "default_servicelevel_token": "usps_priority",
  "label_filetype": "PDF_4x6",
  "metadata": "BATCH #170",
  "batch_shipments": [
    {
      "shipment": {
        "address_from": {
          "name": "Mr Hippo",
          "street1": "965 Mission St",
          "street2": "Ste 201",
          "city": "San Francisco",
          "state": "CA",
          "zip": "94103",
          "country": "US",
          "phone": "4151234567",
          "email": "mrhippo@goshippo.com"
        },
        "address_to": {
          "name": "Mrs Hippo",
          "company": "",
          "street1": "Broadway 1",
          "street2": "",
          "city": "New York",
          "state": "NY",
          "zip": "10007",
          "country": "US",
          "phone": "4151234567",
          "email": "mrshippo@goshippo.com"
        },
        "parcels": [{
          "length": "5",
          "width": "5",
          "height": "5",
          "distance_unit": "in",
          "weight": "2",
          "mass_unit": "oz"
        }]}      
    },
    {
      "shipment": {
        "address_from": {
          "name": "Mr Hippo",
          "street1": "1092 Indian Summer Ct",
          "city": "San Jose",
          "state": "CA",
          "zip": "95122",
          "country": "US",
          "phone": "4151234567",
          "email": "mrhippo@goshippo.com"
        },
        "address_to": {
          "name": "Mrs Hippo",
          "company": "",
          "street1": "Broadway 1",
          "street2": "",
          "city": "New York",
          "state": "NY",
          "zip": "10007",
          "country": "US",
          "phone": "4151234567",
          "email": "mrshippo@goshippo.com"
        },
        "parcels": [{
          "length": "5",
          "width": "5",
          "height": "5",
          "distance_unit": "in",
          "weight": "20",
          "mass_unit": "lb"
        }]
      }
    }
  ]
}

var addressFrom  = {
  "name":"Ms Hippo",
  "company":"Shippo",
  "street1":"215 Clayton St.",
  "city":"San Francisco",
  "state":"CA",
  "zip":"94117",
  "country":"US", //iso2 country code
  "phone":"+1 555 341 9393",
  "email":"ms-hippo@goshippo.com",
}

// example address_to object dict
var addressTo = {
  "name":"Mr Hippo",
  "company":"London Zoo",
  "street1":"Regent's Park",
  "street2":"Outer Cir",
  "city":"LONDON",
  "state":"",
  "zip":"NW1 4RY",
  "country":"GB", //iso2 country code
  "phone":"+1 555 341 9393",
  "email":"mrhippo@goshippo.com",
  "metadata" : "Hippo T-Shirt Order #1043"
}

// parcel object dict
var parcel = {
  "length":"5",
  "width":"5",
  "height":"5",
  "distance_unit":"in",
  "weight":"2",
  "mass_unit":"lb",
}

var shipments = []

shippo.shipment.create({
  "address_from": addressFrom,
  "address_to": addressTo,
  "parcels": [parcel],
  "async": false
}).catch(function(shipmentErr) {
  console.log("There was an error creating a shipment: %s", shipmentErr);
}).then(function(shipmentResponse) {
  console.log("Shipment created with object id: %s", shipmentResponse.object_id);
  shipments.push({"shipment" : shipmentResponse.object_id});
  // example of creating a batch shipment
  return shippo.batch.create(myBatch);
}).catch(function(createErr) {
  console.log("There was an error creating the batch shipment: %s", createErr);
}).then(function(createResponse) {
  console.log("Batch shipment creation response: %s", JSON.stringify(createResponse, null, 4));
  //Poll a batch object to check for a VALID status before adding/removing shipments or purchasing
  checkBatchStatus(createResponse.object_id);
});

//Using Batch::retrieve to poll for the batch's VALID status is done for demo purposes only
//In practice, it is recommended to register a Batch Create webhook for status updates 
var timeout = 0;
function checkBatchStatus(object_id) {
  shippo.batch.retrieve(object_id)
  .catch(function(retrieveErr) {
    console.log("There was an error retrieving the batch information: %s", retrieveErr);
  }).then(function(response) {
    if (response.status === "VALID") {
      //Example of adding a shipment to a batch object
      shippo.batch.add(response.object_id, shipments)
      .catch(function(addErr) {
        console.log("There was an error adding shipments to the batch: %s", addErr);
      }).then(function(addResponse) {
        console.log("Response from adding shipments to batch: %s", JSON.stringify(addResponse, null, 4));
         //Example of removing a shipment from a batch object
        return shippo.batch.remove(addResponse.object_id, [addResponse.batch_shipments.results[0].object_id]);
      }).catch(function(removeErr) {
        console.log("There was an error removing shipments from the batch: %s", removeErr);
      }).then(function(removeResponse) {
        console.log("Response from removing shipments from the batch: %s", JSON.stringify(removeResponse, null, 4));
        //Example of purchasing a batch shipment
        return shippo.batch.purchase(response.object_id);
      }).catch(function(purchaseErr) {
        console.log("There was an error purchasing the batch shipment: %s", purchaseErr);
      }).then(function(purchaseResponse) {
        console.log("Batch shipment purchase response: %s", JSON.stringify(purchaseResponse, null, 4));
      });      
    } else if (timeout < BATCH_WAIT_TIMEOUT){
      timeout = timeout + POLLING_INTERVAL;
      setTimeout(checkBatchStatus, POLLING_INTERVAL, response.object_id);
    } else {
      console.log("Batch purchase timed out on batch %s", response.object_id);
    }
  });
}

