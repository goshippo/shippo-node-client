#Shippo Node.js API wrapper

Shippo is a shipping API that connects you with multiple shipping providers (such as USPS, UPS, and Fedex) through one interface, and offers you great discounts on shipping rates.

Don't have an account? Sign up at https://goshippo.com/


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
## Author

Maintained by support@goshippo.com . Happy to see
contributions and feedback - fork away!