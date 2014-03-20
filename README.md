# Shippo node.js bindings

## API Overview

Every resource is accessed via your `shippo` instance:

```js
var shippo = require('shippo')('API_USER', 'API_PASSWORD');
```

Here's an example that gets you started. It lists a bunch of stuff and
eventually creates two addresses. It's not hard to imagine how you would go on
to create a parcel, and finally a transaction from this.

```js
var shippo = require('./shippo')('MY_USER_NAME', 'MY_USER_PASSWORD');
var when = require('when');

shippo.addresses.list().then(function(addresses) {
  // do something with all addresses
}).then(function() {
  return shippo.shipments.list()
}).then(function(shipments) {
  // output the most recently created shipment
  console.log(shipments.results[0]);
  // let's look at the corresponding rates...
  return shippo.shipments.rates(shipments.results[0].object_id, 'USD');
}).then(function(rates) {
  // not in picture: Shippo's awesome rates.
  console.log(rates);
}).then(function() { 
  // now let's create two addresses, note the use of promises here!
  // you don't need the when.join() when you are simply creating/passing on one
  resource to the next function in the chain.
  return when.join(shippo.addresses.create({
      "object_purpose": "PURCHASE",
      "name": "Laura Behrens Wu",
      "company": "Shippo",
      "street1": "Clayton St.",
      "street_no": "215",
      "street2": "",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94117",
      "country": "US",
      "phone": "+1 555 341 9393",
      "email": "laura@goshippo.com",
      "ip": "",
      "metadata": "Customer ID 123456"
  }), shippo.addresses.create({
      "object_purpose": "PURCHASE",
      "name": "Horst Wu",
      "company": "Shippo",
      "street1": "Ridge Rd.",
      "street_no": "2600",
      "street2": "",
      "city": "Berkeley",
      "state": "CA",
      "zip": "94709",
      "country": "US",
      "phone": "+1 555 341 9393",
      "email": "laura@goshippo.com",
      "ip": "",
      "metadata": "Customer ID 123456"
  }));
}).then(function(addresses) {
  // now, with both addresses, we could do something. Create a parcel, perhaps?
  console.log("from %s, to %s", addresses[0].name, addresses[1].name);
}, function(err) {
  // if something goes wrong - not that that would ever happen!
  console.log('err %s', err);
});
```

## Credits

This project was *heavily* influenced by the excellent [stripe-node](https://github.com/stripe/stripe-node).
## Author

Maintained by [Tobias Schottdorf](https://github.com/tobstar87). Happy to see
contributions and feedback - fork away!
