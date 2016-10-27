'use strict';

var shippo = require('./testUtils').getSpyableShippo();
var expect = require('chai').expect;

describe('Resourcetest', function() {

    describe('apiVersionSet', function() {

        it('tests that the version header is properly set', function() {
            shippo.set('version', 'sample_version')
            expect('sample_version').to.equal(shippo.address._get_headers('mock_request')['Shippo-API-Version']);
        });

    });

});