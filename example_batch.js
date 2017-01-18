/**
This example demonstrates how to create, retrieve, and purchase batch shipments
as well as adding and removing shipments from a batch
**/


// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('<YOUR_SHIPPO_KEY>');

//Maximum time we'll wait for batch to clear
const BATCH_WAIT_TIMEOUT = 10000;

// example Batch object for batch shipment creation
var myBatch = {
  "default_carrier_account": "e68e95b95e33431a87bdecdd2b891c2b",
  "default_servicelevel_token": "usps_priority",
  "label_filetype": "PDF_4x6",
  "metadata": "BATCH #170",
  "batch_shipments": [
    {
      "shipment": {
        "object_purpose": "PURCHASE",
        "address_from": {
          "object_purpose": "PURCHASE",
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
          "object_purpose": "PURCHASE",
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
        "parcel": {
          "length": "5",
          "width": "5",
          "height": "5",
          "distance_unit": "in",
          "weight": "2",
          "mass_unit": "oz"
        }
      }
    },
    {
      "shipment": {
        "object_purpose": "PURCHASE",
        "address_from": {
          "object_purpose": "PURCHASE",
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
          "object_purpose": "PURCHASE",
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
        "parcel": {
          "length": "5",
          "width": "5",
          "height": "5",
          "distance_unit": "in",
          "weight": "20",
          "mass_unit": "lb"
        }
      }
    }
  ]
}

var myBatchId = '3383a45c840b4754b8c26652f88213d3'

// example Array of shipments to add to a batch shipment
var shipmentsToAdd = [
    {"shipment": "ad1e998b77d04c6a98a9d35549f4b4e9"},
    {"shipment": "e5c74868fc974785889b4b5ab6c9b635"}
]

// example Array of shipments to remove from a batch
var shipmentsToRemove = [
    "1098c49d6e304f45a030e730155c97f0",
    "5766ef14ee224d1db794cc072f746724"
]

// example of adding shipments to a batch
var anotherBatchId = "d1fd274139364202bf87c02030d73d8b"

// example of creating a batch shipment using a Batch object
shippo.batch.create(myBatch)
.then(function(createResponse) {
    console.log("Batch shipment creation response: %s", JSON.stringify(createResponse, null, 4));
    // example of retrieving a previously created batch shipment
    checkBatchStatus(createResponse.object_id);
}, function(createErr) {
    console.log("There was an error creating the batch shipment: %s", createErr);
});



shippo.batch.add(anotherBatchId, shipmentsToAdd)
.then(function(addResponse) {
    console.log("Response from adding shipments to batch: %s", JSON.stringify(addResponse, null, 4));

    // example of removing shipments from a batch
    shippo.batch.remove(anotherBatchId, shipmentsToRemove)
    .then(function(removeResponse) {
        console.log("Response from removing shipments from the batch: %s", JSON.stringify(removeResponse, null, 4));
    }, function(removeErr) {
        console.log("There was an error removing shipments from the batch: %s", removeErr);
    });
}, function(addErr) {
    console.log("There was an error adding shipments to the batch: %s", addErr);
});

var timeout = 0;
function checkBatchStatus(object_id) {
  shippo.batch.retrieve(object_id)
  .then(function(response) {
    if (response.object_status === "VALID") {
      shippo.batch.purchase(response.object_id)
        .then(function(purchaseResponse) {
            console.log("Batch shipment purchase response: %s", JSON.stringify(purchaseResponse, null, 4));
        }, function(purchaseErr) {
            console.log("There was an error purchasing the batch shipment: %s", purchaseErr);
        });
    } else if (timeout < BATCH_WAIT_TIMEOUT){
      timeout = timeout + 1000;
      setTimeout(checkBatchStatus, 1000, response.object_id);
    } else{
      console.log("Batch purchase timed out on batch %s", response.object_id);
    }
  }, function(err) {
    console.log("There was an error retrieving the batch information: %s", retrieveErr);
  });
}


