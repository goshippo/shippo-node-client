/**
This example demonstrates how to purchase a label for an international shipment.
Creating domestic shipment would follow a similiar proccess but would not require
the creation of CustomsItems and CustomsDeclaration objects.
**/


// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');

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

// example CustomsItems object. This is required for int'l shipment only.
var customsItem = {
	"description":"T-Shirt",
	"quantity":2,
	"net_weight":"0.3",
	"mass_unit":"lb",
	"value_amount":"20",
	"value_currency":"USD",
	"origin_country":"US",
	"eccn_ear99": "3A001"
}

var carrier_account;
let transactionCanBePickedUp = false;
// Creating the CustomsDeclaration
// (CustomsDeclaration are NOT required for domestic shipments)
shippo.customsdeclaration.create({
	"certify_signer": "Mr. Hippo",
	"certify": true,
	"items": [customsItem],
	"non_delivery_option": "RETURN",
	"contents_type": "MERCHANDISE",
	"contents_explanation": "stuff",
	"exporter_reference": "Exporter Reference",
	"importer_reference": "",
	"invoice": "Invoice",
	"license": "License",
	"certificate": "Certificate",
	"notes": "Notes",
	"eel_pfc": "NOEEI_30_37_a",
	"aes_itn": "X20180426506889",
	"incoterm": "DDP",
	"b13a_filing_option": "FILED_ELECTRONICALLY",
	"b13a_number": "AB1234567890123",
	"invoiced_charges": {
		"currency": "USD",
		"total_shipping": "1.23",
		"total_taxes": "4.56",
		"total_duties": "78.90",
		"other_fees": "9.87"
	},
	"metadata": "test customsDeclaration"
}).catch(function(err) {
	// Deal with an error
	if (err instanceof shippo.error.ShippoAuthenticationError) {
		console.log("There was an error authenticating against the Shippo API");
	} else {
		console.log("There was an error creating customs declaration: %s", err);
	}
	process.exit(1);
}).then(function(customsDeclaration) {
	console.log("customs Declaration : %s", JSON.stringify(customsDeclaration, null, 4));
	// Creating the shipment object. In this example, the objects are directly passed to the
	// shipment.create method, Alternatively, the Address and Parcel objects could be created
	// using address.create(..) and parcel.create(..) functions respectively.
	// adding the async:false makes this call synchronous
	return shippo.shipment.create({
		"address_from": addressFrom,
		"address_to": addressTo,
		"parcels": [parcel],
		"customs_declaration": customsDeclaration.object_id,
		"async": false
	});
}).catch(function(err) {
	// Deal with an error
	console.log("There was an error creating shipment: %s", err);
	process.exit(1);
}).then(function(shipment) {
	console.log("shipment : %s", JSON.stringify(shipment, null, 4));
	return shippo.shipment.rates(shipment.object_id);
}).catch(function(err) {
	// Deal with an error
	console.log("There was an error retrieving rates : %s", err);
	process.exit(1);
}).then(function(rates) {
	console.log("rates : %s", JSON.stringify(rates, null, 4));
	try {
		const filteredRates = rates.results.filter(rate => rate.provider.toUpperCase().includes('USPS') || rate.provider.toUpperCase().includes('DHL EXPRESS'));
		transactionCanBePickedUp = true;
		rate = filteredRates[0];
		carrier_account = rate.carrier_account;
	} catch (err) {
		// Get the first rate in the rates results for demo purposes.
		rate = rates.results[0];
		if (rates.results[0]) {
			carrier_account = rates.results[0].carrier_account;
		}
	}
	// Purchase the desired rate
	return shippo.transaction.create({"rate": rate.object_id, "async": false})
}).catch(function(err) {
	// Deal with an error
	console.log("There was an error creating transaction : %s", err);
	process.exit(1);
}).then(function(transaction) {
	console.log("transaction : %s", JSON.stringify(transaction, null, 4));
	// print label_url and tracking_number
	if(transaction.status == "SUCCESS") {
		console.log("Label URL: %s", transaction.label_url);
		console.log("Tracking Number: %s", transaction.tracking_number);
	}else{
		//Deal with an error with the transaction
		console.log("Message: %s", JSON.stringify(transaction.messages, null, 2));
	}
	if (transactionCanBePickedUp) {			
		var requested_start_time = new Date();
		requested_start_time.setDate(requested_start_time.getDate() + 1);
		var requested_end_time = new Date();
		requested_end_time.setDate(requested_start_time.getDate() + 1.1);
		return shippo.pickup.create({
			carrier_account,
			location: {
				building_location_type: 'Knock on Door',
				address: addressFrom,
			},
			transactions: [transaction.object_id],
			requested_start_time,
			requested_end_time,
			is_test: false
		})
	}
	return false;
}).catch(function(err) {
	if (err.detail && err.detail.messages) {
		err.detail.messages.forEach(message => {
			if(message.includes('You have already requested')) {
				console.log("There is a pickup already scheduled for this address and date");
				process.exit(1);
			}
		});		
	}
	// Deal with an error
	console.log("There was an error creating a pickup : %s", err);
	process.exit(1);
}).then(function(pickups) {
	if (transactionCanBePickedUp) {
		console.log("pickups : %s", JSON.stringify(pickups, null, 4));
	}
});
