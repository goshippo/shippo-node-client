/** 
This example demonstrates how to purchase a label for an international shipment.
Creating domestic shipment would follow a similiar proccess but would not require
the creation of CustomsItems and CustomsDeclaration objects.
**/


// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');

var addressFrom  = {
	"object_purpose":"PURCHASE",
	"name":"Laura Behrens Wu",	
	"company":"Shippo",
	"street1":"215 Clayton St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94117",
	"country":"US", //iso2 country code
	"phone":"+1 555 341 9393",
	"email":"laura@goshippo.com",
}

// example address_to object dict
var addressTo = {
	"object_purpose":"PURCHASE",
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
	"metadata" : "Hippos dont lie"
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
		
// example CustomsItems object. This is required for int'l shipment only.
var customsItem = {
	"description":"T-Shirt",
	"quantity":2,
	"net_weight":"0.3",
	"mass_unit":"lb",
	"value_amount":"20",
	"value_currency":"USD",
	"origin_country":"US",
}

// Creating the CustomsDeclaration
// (CustomsDeclaration are NOT required for domestic shipments)
shippo.customsdeclaration.create({
	"contents_type": "MERCHANDISE",
	"contents_explanation": "T-Shirt purchase",
	"non_delivery_option": "RETURN",
	"certify": true,
	"certify_signer": "Laura Behrens Wu",
	"items": [customsItem],
}).then(function(customs_declaration){
	console.log("customs Declaration : %s", JSON.stringify(customs_declaration, null, 4));
	// Creating the shipment object. In this example, the objects are directly passed to the
	// shipment.create method, Alternatively, the Address and Parcel objects could be created
	// using address.create(..) and parcel.create(..) functions respectively.
	return shippo.shipment.create({
		"object_purpose": "PURCHASE",
		"address_from": addressFrom,
		"address_to": addressTo,
		"parcel": parcel,
		"submission_type": "DROPOFF",
		"customs_declaration": customs_declaration.object_id
	})
	
}, function(err) {
	// Deal with an error
	console.log("There was an error creating customs declaration: %s", err);
}).then(function(shipment){
	console.log("shipment : %s", JSON.stringify(shipment, null, 4));
	//Wait for rates to be generated
	function ratesReady(shipment,attempts){
		if ((shipment.object_status == "QUEUED" || shipment.object_status == "WAITING") && attempts < 10){
			shippo.shipment.retrieve(shipment.object_id).then(function(val){
				ratesReady(val,attempts+1);
			});
		}else{
			shippo.shipment.rates(shipment.object_id).then(function(rates){
				console.log("rates : %s", JSON.stringify(rates, null, 4));
				// Get the first rate in the rates results for demo purposes.
				rate = rates.results[0]

				// Purchase the desired rate.
				return shippo.transaction.create({"rate": rate.object_id})
	
			}, function(err) {
				// Deal with an error
				console.log("There was an error retrieving rates : %s", err);
			}).then(function(transaction){
				console.log("transaction : %s", JSON.stringify(transaction, null, 4));
				//Wait for transaction to be proccessed
				transactionReady(transaction,0);
				
			}, function(err) {
				// Deal with an error
				console.log("There was an error creating transaction : %s", err);
			});
		}
	}
	//Wait for transaction to be proccessed
	function transactionReady(transaction,attempts){
		if ((transaction.object_status == "QUEUED" || transaction.object_status == "WAITING") && attempts < 10){
			shippo.transaction.retrieve(transaction.object_id).then(function(val){
				transactionReady(val,attempts+1);
			});
		}else{
			// print label_url and tracking_number
			if(transaction.object_status == "SUCCESS"){
				console.log("Label URL: %s",transaction.label_url); 
				console.log("Tracking Number: %s",transaction.tracking_number); 
			}else{
				console.log("Message: %s",transaction.messages);
			}
		}
	}
	ratesReady(shipment,0);

},function(err){
	// Deal with an error
	console.log("There was an error creating shipment: %s", err);
});
