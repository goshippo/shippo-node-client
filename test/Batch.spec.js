'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

var arr = ["a", "b", "c"]
var BASE_PATH = shippo.get('basePath') + 'batches/'
console.log(toString.call(arr))

describe('Batch Resource', function() {
  
  describe('retrieve', function(){

    it('Sends the correct request', function() {

      shippo.batch.retrieve("batchIdFoo", "2", "creation_failed");
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: BASE_PATH + 'batchIdFoo?page=2&object_results=creation_failed',
        data: {}
      });

    });

  });

  describe('add', function(){

    it('Sends the correct request', function() {

      shippo.batch.add('batchIdFoo', [
        {"shipment": "batchIdFoo1"},
        {"shipment": "batchIdFoo2"},
        {"shipment": "batchIdFoo3"},
        {"shipment": "batchIdFoo4"}
      ]);
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH + 'batchIdFoo/add_shipments/',
        data: [
          {"shipment": "batchIdFoo1"},
          {"shipment": "batchIdFoo2"},
          {"shipment": "batchIdFoo3"},
          {"shipment": "batchIdFoo4"}
        ]
      });

    });

  });

 describe('remove', function(){

    it('Sends the correct request', function() {

      shippo.batch.remove('batchIdFoo', [
        "batchIdFoo1",
        "batchIdFoo2",
        "batchIdFoo3",
        "batchIdFoo4"
      ]);
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH + 'batchIdFoo/remove_shipments/',
        data: [
          "batchIdFoo1",
          "batchIdFoo2",
          "batchIdFoo3",
          "batchIdFoo4"
        ]
      });

    });

  });

  describe('purchase', function(){

    it('Sends the correct request', function() {

      shippo.batch.purchase('batchIdFoo');
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH + 'batchIdFoo/purchase/',
        data: {}
      });

    });

  });

  describe('create', function() {

    it('Sends the correct request', function() {

      shippo.batch.create({
        "default_carrier_account": "078870331023437cb917f5187429b093",
        "default_servicelevel_token": "usps_priority",
        "label_filetype": "PDF_4x6",
        "metadata": "Test Batch",
        "batch shipments": [
          {
            "shipment": {    
              "address_from": {
                "name": "Mr Hippo",
                "street1": "965 Mission St",
                "street2": "Ste 201",
                "city": "San Francisco",
                "state": "CA",
                "zip": "94103",
                "country": "US",
                "phone": "4151234567",
                "email": "mrhippo@goshippo.com"
              },
              "address_to": {
                "name": "Mrs Hippo",
                "company": "",
                "street1": "Broadway 1",
                "street2": "",
                "city": "New York",
                "state": "NY",
                "zip": "10007",
                "country": "US",
                "phone": "4151234567",
                "email": "mrshippo@goshippo.com"
              },
              "parcels": [{
                "length": "5",
                "width": "5",
                "height": "5",
                "distance_unit": "in",
                "weight": "2",
                "mass_unit": "oz"
              }]
            }
          },
          {
            "shipment": {    
              "address_from": {
                "name": "Mr Hippo",
                "street1": "1092 Indian Summer Ct",
                "city": "San Jose",
                "state": "CA",
                "zip": "95122",
                "country": "US",
                "phone": "4151234567",
                "email": "mrhippo@goshippo.com"
              },
              "address_to": {
                "name": "Mrs Hippo",
                "company": "",
                "street1": "Broadway 1",
                "street2": "",
                "city": "New York",
                "state": "NY",
                "zip": "10007",
                "country": "US",
                "phone": "4151234567",
                "email": "mrshippo@goshippo.com"
              },
              "parcels": [{
                "length": "5",
                "width": "5",
                "height": "5",
                "distance_unit": "in",
                "weight": "20",
                "mass_unit": "lb"
              }]
            },
            "carrier_account": "a4391cd4ab974f478f55dc08b5c8e3b3",
            "servicelevel_token": "fedex_2_day"
          }
        ]
      });
      expect(shippo.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: BASE_PATH,
        data: {
          "default_carrier_account": "078870331023437cb917f5187429b093",
          "default_servicelevel_token": "usps_priority",
          "label_filetype": "PDF_4x6",
          "metadata": "Test Batch",
          "batch shipments": [
            {
              "shipment": {    
                "address_from": {
                  "name": "Mr Hippo",
                  "street1": "965 Mission St",
                  "street2": "Ste 201",
                  "city": "San Francisco",
                  "state": "CA",
                  "zip": "94103",
                  "country": "US",
                  "phone": "4151234567",
                  "email": "mrhippo@goshippo.com"
                },
                "address_to": {
                  "name": "Mrs Hippo",
                  "company": "",
                  "street1": "Broadway 1",
                  "street2": "",
                  "city": "New York",
                  "state": "NY",
                  "zip": "10007",
                  "country": "US",
                  "phone": "4151234567",
                  "email": "mrshippo@goshippo.com"
                },
                "parcels": [{
                  "length": "5",
                  "width": "5",
                  "height": "5",
                  "distance_unit": "in",
                  "weight": "2",
                  "mass_unit": "oz"
                }]
              }
            },
            {
              "shipment": {    
                "address_from": {
                  "name": "Mr Hippo",
                  "street1": "1092 Indian Summer Ct",
                  "city": "San Jose",
                  "state": "CA",
                  "zip": "95122",
                  "country": "US",
                  "phone": "4151234567",
                  "email": "mrhippo@goshippo.com"
                },
                "address_to": {
                  "name": "Mrs Hippo",
                  "company": "",
                  "street1": "Broadway 1",
                  "street2": "",
                  "city": "New York",
                  "state": "NY",
                  "zip": "10007",
                  "country": "US",
                  "phone": "4151234567",
                  "email": "mrshippo@goshippo.com"
                },
                "parcels": [{
                  "length": "5",
                  "width": "5",
                  "height": "5",
                  "distance_unit": "in",
                  "weight": "20",
                  "mass_unit": "lb"
                }]
              },
              "carrier_account": "a4391cd4ab974f478f55dc08b5c8e3b3",
              "servicelevel_token": "fedex_2_day"
            }
          ]
          }
      });

    });

  });
  
});