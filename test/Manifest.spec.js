'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Manifest Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.manifest.retrieve('ManifestIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/manifests/ManifestIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.manifest.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/manifests/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.manifest.create({
	      "provider": "USPS",
	      "submission_date": "2014-05-16T23:59:59Z",
	      "address_from": "28828839a2b04e208ac2aa4945fbca9a"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/manifests/',
        data: {       
		    "provider": "USPS",
		    "submission_date": "2014-05-16T23:59:59Z",
		    "address_from": "28828839a2b04e208ac2aa4945fbca9a"
  	  	}
      });

    });

  });
  
});