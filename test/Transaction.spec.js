'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Transaction Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      shippo.transaction.retrieve('TransactionIdFoo123');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/transactions/TransactionIdFoo123',
        data: {}
      });

    });

  });
  
  describe('list', function() {

    it('Sends the correct request', function() {

      shippo.transaction.list();
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/transactions/',
        data: {}
      });

    });

  });
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.transaction.create({
	      "rate": "67891d0ebaca4973ae2569d759da6139",
	      "notification_email_from": true,
	      "notification_email_to": false,
	      "notification_email_other": "max@goshippo.com",
	      "metadata": "Customer ID 123456"
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/transactions/',
        data: {       
		    "rate": "67891d0ebaca4973ae2569d759da6139",
		    "notification_email_from": true,
		    "notification_email_to": false,
		    "notification_email_other": "max@goshippo.com",
		    "metadata": "Customer ID 123456"
  	  	}
      });

    });

  });
  
});