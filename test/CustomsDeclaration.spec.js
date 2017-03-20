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

      shippo.customsdeclaration.create({
			"exporter_reference": "",
			"importer_reference": "",
			"contents_type": "MERCHANDISE",
			"contents_explanation": "T-Shirt purchase",
			"invoice": "#123123",
			"license": "",
			"certificate": "",
			"notes": "",
			"eel_pfc": "NOEEI_30_37_a",
			"aes_itn": "",
			"non_delivery_option": "ABANDON",
			"certify": true,
			"certify_signer": "Laura Behrens Wu",
			"disclaimer": "",
			"incoterm": "",
			"items": [
			  "0c1a723687164307bb2175972fbcd9ef"
			],
			"metadata": "Order ID #123123"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH + 'declarations/',
        data: {       
			"exporter_reference": "",
			"importer_reference": "",
			"contents_type": "MERCHANDISE",
			"contents_explanation": "T-Shirt purchase",
			"invoice": "#123123",
			"license": "",
			"certificate": "",
			"notes": "",
			"eel_pfc": "NOEEI_30_37_a",
			"aes_itn": "",
			"non_delivery_option": "ABANDON",
			"certify": true,
			"certify_signer": "Laura Behrens Wu",
			"disclaimer": "",
			"incoterm": "",
			"items": [
			  "0c1a723687164307bb2175972fbcd9ef"
			],
			"metadata": "Order ID #123123"
  	  	}
      });

    });

  });
  
});