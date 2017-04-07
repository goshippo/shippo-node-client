'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'manifests/'

describe('Manifest Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.manifest.retrieve('ManifestIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'ManifestIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.manifest.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH,
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.manifest.create({
	      "provider": "USPS",
	      "shipment_date": "2014-05-16T23:59:59Z",
	      "address_from": "28828839a2b04e208ac2aa4945fbca9a"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: {       
		    "provider": "USPS",
		    "shipment_date": "2014-05-16T23:59:59Z",
		    "address_from": "28828839a2b04e208ac2aa4945fbca9a"
  	  	}
      });

    });

  });
  
});