'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'customs/items/'

describe('Customs Items Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.customsitem.retrieve('CustomsItemIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'CustomsItemIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.customsitem.list();
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
        "description": "T-Shirt",
        "quantity": 2,
        "net_weight": "400",
        "mass_unit": "g",
        "value_amount": "20",
        "value_currency": "USD",
        "tariff_number": "",
        "origin_country": "US",
        "sku_code": "AB123",
        "eccn_ear99": "0A979",
        "metadata": "Order ID #123123"
      };

      shippo.customsitem.create(payload);
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: payload
      });

    });

  });
  
});