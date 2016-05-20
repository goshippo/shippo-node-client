#Shippo Node.js API wrapper

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

Every resource is accessed via your `shippo` instance:

```js
    var shippo = require('shippo')('<YOUR_PRIVATE_KEY>');
```
The snippet below demonstrates how to create an address object. check examples.js for more detailed example for generating a shipping label:

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
