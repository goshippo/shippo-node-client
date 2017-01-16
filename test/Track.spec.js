'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Tracking Resource', function() {
  
  describe('get_status', function() {

    it('Sends the correct request', function() {

      shippo.track.get_status('carrierFoo', 'trackingNumberFoo');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/tracks/carrierFoo/trackingNumberFoo/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.track.create({
	      "carrier": "usps",
        "tracking_number": "967893498757822",
        "metadata": "Order 20512647" 
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/tracks/',
        data: {       
			"carrier": "usps",
      "tracking_number": "967893498757822",
      "metadata": "Order 20512647"
  	  	}
      });

    });

  });
  
});