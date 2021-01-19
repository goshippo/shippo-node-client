'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'orders/'

describe('Order Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.order.retrieve('OrderIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'OrderIdFoo123',
        data: {}
      });

    });

  });

  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.order.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH,
        data: {}
      });

    });

  });

  describe('create', function() {

    it('Sends the correct request', function() {

      var payload = {
        "placed_at": "2014-05-16T23:59:59Z",
        "to_address": {
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
          "metadata": "Customer ID 123456"
        },
        "weight": "2",
        "weight_unit": "lb"
      };

      shippo.order.create(payload);
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: payload
      });

    });

  });

});