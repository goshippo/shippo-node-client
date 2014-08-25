'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Parcel Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.parcel.retrieve('ParcelIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/parcels/ParcelIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.parcel.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/parcels/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.parcel.create({
	      "length": "5",
	      "width": "5",
	      "height": "5",
	      "distance_unit": "cm",
	      "weight": "2",
	      "mass_unit": "lb",
	      "template": "",
	      "metadata": "Customer ID 123456"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/parcels/',
        data: {       
		    "length": "5",
		    "width": "5",
		    "height": "5",
		    "distance_unit": "cm",
		    "weight": "2",
		    "mass_unit": "lb",
		    "template": "",
		    "metadata": "Customer ID 123456"
  	  	}
      });

    });

  });
  
});