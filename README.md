#Shippo Node.js API wrapper
[![npm version](https://badge.fury.io/js/shippo.svg)](https://badge.fury.io/js/shippo)
[![Build Status](https://travis-ci.org/goshippo/shippo-node-client.svg?branch=add-travis-ci)](https://travis-ci.org/goshippo/shippo-node-client)

Shippo is a shipping API that connects you with multiple shipping carriers (such as USPS, UPS, DHL, Canada Post, Australia Post, UberRUSH and many [others](https://goshippo.com/shipping-carriers/)) through one interface.

Our API provides in depth support of carrier functionality. Here are just some of the features we support for USPS, FedEx and UPS via the API.

For most major carriers (USPS, UPS, FedEx and most others) our API supports:

* Shipping rates & labels
* Tracking
	
* For USPS, the API additionally supports:
	* US Address validation
	* Scan forms
	* Additional services: signature, certified mail, delivery confirmation, and others

* For FedEx, the API additionally supports:
	* Signature and adult signature confirmation
	* FedEx Smartpost

* For UPS, the API additionally supports:
	* Signature and adult signature confirmation
	* UPS Mail Innovations
	* UPS SurePost

The complete list of carrier supported features is [here](https://goshippo.com/shipping-api/carriers).

###About Shippo
Connect with multiple different carriers, get discounted shipping labels, track parcels, and much more with just one integration. You can use your own carrier accounts or take advantage of our deeply discounted rates. Using Shippo makes it easy to deal with multiple carrier integrations,  rate shopping, tracking and other parts of the shipping workflow. We provide the API and dashboard for all your shipping needs.

The API is free to use. You only pay when you print a live label from a carrier.  Use test labels during development to avoid all fees.

You do need a Shippo account to use our API. Don't have an account? Sign up at [https://goshippo.com/](https://goshippo.com/).

## Installation:
You can install this package by running the follwing command:
```shell
  npm install shippo
```
This means, you don't actually have to download this repository. If you wish to make modifications to the wrapper, you can clone this repository into your project. 

### Requirements:
The shippo Node.js has the following dependencies:
```js
  npm install when
```

## Usage:

Initialize your `shippo` instance using your `Private Auth Token` provided to you on the `API` page in the Shippo Dashboard.

```js
    var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');
```
The snippet below demonstrates how to create an address object (a Shippo `Resource`). Check examples.js for more detailed example for generating a shipping label:

```js
    var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');
    
    shippo.address.create({
          'object_purpose' : 'PURCHASE',
          'name' : 'Mr Hippo',
          'company' : 'SF Zoo',
          'street1' : '2945 Sloat Blvd',
          'city' : 'San Francisco',
          'state' : 'CA',
          'zip' : '94132',
          'country' : 'US',
          'phone' : '+1 555 341 9393',
          'email' : 'mrhippo@goshippo.com'
    }).then(function(address){
      console.log("shipment : %s", JSON.stringify(address));
    });
```

### International Multipiece Shipment Example

This example demonstrates how to purchase a label for an international shipment.
Creating domestic shipment would follow a similiar proccess but would not require
the creation of CustomsItems and CustomsDeclaration objects.

```js

var addressFrom  = {
	"object_purpose":"PURCHASE",
	"name":"Ms Hippo",
	"company":"Shippo",
	"street1":"215 Clayton St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94117",
	"country":"US", //iso2 country code
	"phone":"+1 555 341 9393",
	"email":"support@goshippo.com",
};

// example address_to object dict
var addressTo = {
	"object_purpose":"PURCHASE",
	"name":"Ms Hippo",
	"company":"Shippo",
	"street1":"803 Clayton St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94117",
	"country":"US", //iso2 country code
	"phone":"+1 555 341 9393",
	"email":"support@goshippo.com",
};

// parcel object dict
var parcelOne = {
	"length":"5",
	"width":"5",
	"height":"5",
	"distance_unit":"in",
	"weight":"2",
	"mass_unit":"lb"
};

var parcelTwo = {
    "length":"5",
    "width":"5",
    "height":"5",
    "distance_unit":"in",
    "weight":"2",
    "mass_unit":"lb"
};

var shipment = {
    "object_purpose": "PURCHASE",
    "address_from": addressFrom,
    "address_to": addressTo,
    "parcel": [parcelOne, parcelTwo],
    "submission_type": "DROPOFF"
};

shippo.transaction.create({
	"shipment": shipment,
	"servicelevel_token": "ups_ground",
	"carrier_account": "558c84bbc25a4f609f9ba02da9791fe4",
	"label_file_type": "png"
})
.then(function(transaction) {
    shippo.transaction.list({
      "rate": transaction.rate
    })
    .then(function(mpsTransactions) {
        mpsTransactions.results.forEach(function(mpsTransaction){
            if(mpsTransaction.object_status == "SUCCESS") {
                console.log("Label URL: %s", mpsTransaction.label_url);
                console.log("Tracking Number: %s", mpsTransaction.tracking_number);
            } else {
                // hanlde error transactions
                console.log("Message: %s", mpsTransactions.messages);
            }
        });
    })
}, function(err) {
    // Deal with an error
    console.log("There was an error creating transaction : %s", err.detail);
});
```

## Tests:
### Requirements:
For the test cases the following packages are required:
```js
  npm install mocha
  npm install chai
  npm install mocha-as-promised
  npm install chai-as-promised
```

## Credits

This project was influenced by the excellent [stripe-node](https://github.com/stripe/stripe-node).

## Documentation

Please see [https://goshippo.com/shipping-api/](https://goshippo.com/shipping-api/) for up-to-date documentation.
