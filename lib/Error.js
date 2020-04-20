'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by shippo-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Shippo's REST API)
 */
var ShippoError = _Error.ShippoError = _Error.extend({
  type: 'ShippoError',
  populate: function(raw) {

    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.code = raw.code;
    this.message = raw.message;
    this.detail = raw.detail;
    this.path = raw.path;
    this.statusCode = raw.statusCode;
  }
});

/**
 * Helper factory which takes raw shippo errors and outputs wrapping instances
 */
ShippoError.generate = function(rawShippoError) {
  switch (rawShippoError.type) {
    case 'invalid_request_error':
      return new _Error.ShippoInvalidRequestError(rawShippoError);
    case 'api_error':
      return new _Error.ShippoAPIError(rawShippoError);
  }
  return new _Error('Generic', 'Unknown Error');
};

// Specific Shippo Error types:
_Error.ShippoNotFoundError = ShippoError.extend({ type: 'ShippoNotFoundError' });
_Error.ShippoInvalidRequestError = ShippoError.extend({ type: 'ShippoInvalidRequest' });
_Error.ShippoAPIError = ShippoError.extend({ type: 'ShippoAPIError' });
_Error.ShippoAuthenticationError = ShippoError.extend({ type: 'ShippoAuthenticationError' });
_Error.ShippoConnectionError = ShippoError.extend({ type: 'ShippoConnectionError' });
