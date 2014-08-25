'use strict';

require('./testUtils');

var Error = require('../lib/Error');
var expect = require('chai').expect;

describe('Error', function() {

  it('Populates with type and message params', function() {
    var e = new Error('FooError', 'Foo happened');
    expect(e).to.have.property('type', 'FooError');
    expect(e).to.have.property('message', 'Foo happened');
  });

  describe('ShippoError', function() {
    it('Generates specific instance depending on error-type', function() {
      expect(Error.ShippoError.generate({ type: 'invalid_request_error' })).to.be.instanceOf(Error.ShippoInvalidRequestError);
      expect(Error.ShippoError.generate({ type: 'api_error' })).to.be.instanceOf(Error.ShippoAPIError);
    });
  });

});