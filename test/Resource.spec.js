'use strict';

var getSpyableShippo = require('./testUtils').getSpyableShippo;
var expect = require('chai').expect;

describe('Resourcetest', function() {

    var shippo;

    describe('apiVersionSet', function() {

        before(function() {
            shippo = getSpyableShippo();
        });

        it('tests that the version header is properly set', function() {
            shippo.set('version', 'sample_version')
            expect(shippo.address._get_headers('mock_request')['Shippo-API-Version']).to.equal('sample_version');
        });

    });

    describe('authorization tokens', function() {

        describe('on init', function() {

            it('correctly uses a shippoToken by default', function () {
                shippo = getSpyableShippo('mockShippoToken');
                expect(shippo.address._get_headers('mock_request')['Authorization']).to.equal('ShippoToken mockShippoToken');
            });

            it('correctly uses an explicit shippoToken', function () {
                shippo = getSpyableShippo({shippoToken: 'anotherMockShippoToken'});
                expect(shippo.address._get_headers('mock_request')['Authorization']).to.equal('ShippoToken anotherMockShippoToken');
            })

            it('correctly uses an explicit oauthToken', function () {
                shippo = getSpyableShippo({oauthToken: 'mockOauthToken'});
                expect(shippo.address._get_headers('mock_request')['Authorization']).to.equal('Bearer mockOauthToken');
            })

            it('throws an error if both tokens are provided', function () {
                expect(function () {
                    getSpyableShippo({shippoToken: 'mockToken1', oauthToken: 'mockToken2'});
                }).to.throw('Ambiguous authentication credentials');
            })

        });

        describe('setToken method', function() {

            it('correctly sets shippoToken', function() {
                shippo = getSpyableShippo({ oauthToken: 'mockOauthToken' });
                shippo.setToken({ shippoToken: 'mockShippoToken' });
                expect(shippo.address._get_headers('mock_request')['Authorization']).to.equal('ShippoToken mockShippoToken');
            })

            it('correctly sets oauthToken', function() {
                shippo = getSpyableShippo({shippoToken: 'mockShippoToken'});
                shippo.setToken({ oauthToken: 'mockOauthToken' });
                expect(shippo.address._get_headers('mock_request')['Authorization']).to.equal('Bearer mockOauthToken');
            })
        })

    });

});