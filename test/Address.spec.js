'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Address Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.address.retrieve('addressIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/addresses/addressIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.address.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/addresses/',
        data: {}
      });

    });

  });
  
  describe('validate', function() {

    it('Sends the correct request', function() {

      shippo.address.validate('addressIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/addresses/addressIdFoo123/validate/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.address.create({
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
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/addresses/',
        data: {       
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
  	  	}
      });

    });

  });
  
});