'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'customs/'

describe('Customs Declaration Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.customsdeclaration.retrieve('CustomsItemIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'declarations/CustomsItemIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.customsdeclaration.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'declarations/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      var payload = {
        "exporter_reference": "Exporter Reference",
        "importer_reference": "Importer Reference",
        "contents_type": "MERCHANDISE",
        "contents_explanation": "T-Shirt purchase",
        "invoice": "#123123",
        "license": "License",
        "certificate": "Certificate",
        "notes": "Notes",
        "eel_pfc": "NOEEI_30_37_a",
        "aes_itn": "X20180426506889",
        "non_delivery_option": "ABANDON",
        "certify": true,
        "certify_signer": "Laura Behrens Wu",
        "incoterm": "DDP",
        "items": [
          "0c1a723687164307bb2175972fbcd9ef"
        ],
        "invoiced_charges": {
          "currency": "USD",
          "total_shipping": "1.23",
          "total_taxes": "4.56",
          "total_duties": "78.90",
          "other_fees": "9.87"
        },
        "metadata": "Order ID #123123"
      };

      shippo.customsdeclaration.create(payload);
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH + 'declarations/',
        data: payload
      });

    });

  });
  
});