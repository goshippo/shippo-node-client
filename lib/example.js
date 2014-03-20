var shippo = require('./shippo.js')('unittest', 'unittest');
var when = require('when');

shippo.addresses.list().then(function(addresses) {
  //console.log(addresses.results[0]);
}).then(function() {
  return shippo.shipments.list()
}).then(function(shipments) {
  console.log(shipments.results[0]);
  return shippo.shipments.rates(shipments.results[0].object_id, 'USD');
}).then(function(rates) {
  //console.log(rates);
}).then(function() { 
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
  console.log("from %s, to %s", addresses[0].name, addresses[1].name);
}, function(err) {
  console.log('err %s', err);
});
