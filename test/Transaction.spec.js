'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'transactions/'

describe('Transaction Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.transaction.retrieve('TransactionIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'TransactionIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.transaction.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH,
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.transaction.create({
	      "rate": "67891d0ebaca4973ae2569d759da6139",
	      "metadata": "Customer ID 123456"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: {       
		    "rate": "67891d0ebaca4973ae2569d759da6139",
		    "metadata": "Customer ID 123456"
  	  	}
      });

    });

  });
  
});