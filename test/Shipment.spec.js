'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Shipment Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.shipment.retrieve('ShipmentIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/shipments/ShipmentIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.shipment.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/shipments/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.shipment.create({
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
        url: '/v1/shipments/',
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
  
  describe('rates', function() {

    it('Sends the correct request', function() {

      shippo.shipment.rates("ShipmentIdFoo123");
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/shipments/ShipmentIdFoo123/rates/',
        data: {}
      });

    });

  });
  
});