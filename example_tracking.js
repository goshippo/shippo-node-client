/**
This example demonstrates how to track a shipment using carrier information and
a tracking number as well as how to register a webhook for tracking updates
**/


// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');

// example Tracking object for tracking a shipment
shippo.track.get_status('usps', '1122334455667788')
.then(function(status) {
	console.log("Tracking info: %s", JSON.stringify(status, null, 4));
}).catch(function(err) {
	console.log("There was an error retrieving tracking information: %s", err);
});

// example object for registering a webhook for tracking shipments
var webhookData = {
	"carrier":"shippo",
	"tracking_number":"SHIPPO_TRANSIT",
	"metadata": "test order"
}

// Registering a webhook for tracking shipments
shippo.track.create(webhookData)
.then(function(webhook) {
	console.log("Webhook response: %s", JSON.stringify(webhook, null, 4));
})
.catch(function(err) {
	console.log("There was an error registering the webhook: %s", err);
});
