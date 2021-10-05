'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var BASE_PATH = shippo.get('basePath') + 'pickups/'

describe('Pickup Resource', function() {
  
  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.pickup.create({
          "carrier_account": "078870331023437cb917f5187429b093",
          "location": { 
            "building_location_type": "Knock on Door", 
            "address": {
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
          },
          "transactions": [ "b8a983ec2e6f47e88051bdcd3f241640" ],
          "requested_start_time": "2021-10-05T15:54:10.456Z",
          "requested_end_time": "2021-10-06T15:54:10.456Z",
          "is_test": false
        });

      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: {
          "carrier_account": "078870331023437cb917f5187429b093",
          "location": { 
            "building_location_type": "Knock on Door", 
            "address": {
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
          },
          "transactions": [ "b8a983ec2e6f47e88051bdcd3f241640" ],
          "requested_start_time": "2021-10-05T15:54:10.456Z",
          "requested_end_time": "2021-10-06T15:54:10.456Z",
          "is_test": false
        }
      });

    });

  });
  
});
