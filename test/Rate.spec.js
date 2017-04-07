'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'rates/'

describe('Rate Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.rate.retrieve('RateIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'RateIdFoo123',
        data: {}
      });

    });

  });
  
});