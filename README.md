# Shippo Node.js API wrapper
[![npm version](https://badge.fury.io/js/shippo.svg)](https://badge.fury.io/js/shippo)
[![Build Status](https://travis-ci.org/goshippo/shippo-node-client.svg?branch=add-travis-ci)](https://travis-ci.org/goshippo/shippo-node-client)

Shippo is a shipping API that connects you with [multiple shipping carriers](https://goshippo.com/carriers/) (such as USPS, UPS, DHL, Canada Post, Australia Post, UberRUSH and many others) through one interface.

Print a shipping label in 10 mins using our default USPS and DHL Express accounts. No need to register for a carrier account to get started.

You will need to [register for a Shippo account](https://goshippo.com/) to use the Shippo API. It's free to sign up, free to use the API. Only pay to print a live label, test labels are free.

## Installation:
You can install this package by running the following command:
```shell
  npm install shippo
```
This means, you don't actually have to download this repository. If you wish to make modifications to the wrapper, you can clone this repository into your project.

### Requirements:
The shippo Node.js has no additional dependencies.

## Usage:

Initialize your `shippo` instance using your `Private Auth Token` provided to you on the `API` page in the Shippo Dashboard.

```js
    var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');
```
The snippet below demonstrates how to create an address object (a Shippo `Resource`). Check examples.js for more detailed example for generating a shipping label:

```js
    var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');

    shippo.address.create({
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
    "address_from": addressFrom,
    "address_to": addressTo,
    "parcels": [parcelOne, parcelTwo],
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
            if(mpsTransaction.status == "SUCCESS") {
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

Please see [https://goshippo.com/docs](https://goshippo.com/docs) for up-to-date documentation.

## About Shippo

Connect with multiple different carriers, get discounted shipping labels, track parcels, and much more with just one integration. You can use your own carrier accounts or take advantage of our discounted rates with the USPS and DHL Express. Using Shippo makes it easy to deal with multiple carrier integrations, rate shopping, tracking and other parts of the shipping workflow. We provide the API and dashboard for all your shipping needs.

## Supported Features

The Shippo API provides in depth support of carrier and shipping functionalities. Here are just some of the features we support through the API:

* Shipping rates & labels
* Tracking for any shipment with just the tracking number
* Batch label generation
* Multi-piece shipments
* Manifests and SCAN forms
* Customs declaration and commercial invoicing
* Address verification
* Signature and adult signature confirmation
* Consolidator support including:
	* DHL eCommerce
	* UPS Mail Innovations
	* FedEx Smartpost
* Additional services: cash-on-delivery, certified mail, delivery confirmation, and more.
