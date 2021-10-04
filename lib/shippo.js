'use strict';

Shippo.AUTH_SCHEME_SHIPPO = 'ShippoToken'
Shippo.AUTH_SCHEME_OAUTH = 'Bearer'

Shippo.DEFAULT_HOST = 'api.goshippo.com';
Shippo.DEFAULT_PROTOCOL = 'https';
Shippo.DEFAULT_PORT = '443';
Shippo.DEFAULT_AUTH_SCHEME = Shippo.AUTH_SCHEME_SHIPPO;
Shippo.DEFAULT_BASE_PATH = '/';
Shippo.DEFAULT_TIMEOUT = 30000; // 30 seconds; override with setTimeout on Shippo instance
Shippo.PACKAGE_VERSION = '0.0.2';

Shippo.USER_AGENT = 'Shippo/v1 NodeBindings/'+Shippo.PACKAGE_VERSION;

Shippo.resources = {
  Address: require('./resources/Address'),
  Shipment: require('./resources/Shipment'),
  Parcel: require('./resources/Parcel'),
  Transaction: require('./resources/Transaction'),
  CustomsItem: require('./resources/CustomsItem'),
  CustomsDeclaration: require('./resources/CustomsDeclaration'),
  CarrierAccount: require('./resources/CarrierAccount'),
  Manifest: require('./resources/Manifest'),
  Refund: require('./resources/Refund'),
  Rate: require('./resources/Rate'),
  Batch: require('./resources/Batch'),
  Track: require('./resources/Track'),
  Order: require('./resources/Order'),
  Pickup: require('./resources/Pickup'),
};

Shippo.Error = require('./Error');
Shippo.Resource = require('./Resource');

function Shippo(token) {

  if (!(this instanceof Shippo)) {
    return new Shippo(token);
  }


  this._api = {
    host: Shippo.DEFAULT_HOST,
    port: Shippo.DEFAULT_PORT,
    protocol: Shippo.DEFAULT_PROTOCOL,
    authScheme: Shippo.DEFAULT_AUTH_SCHEME,
    basePath: Shippo.DEFAULT_BASE_PATH,
    timeout: Shippo.DEFAULT_TIMEOUT,
    dev: false
  };

  if(typeof(token) !== 'undefined') {
    this.setToken(token);
  }

  this._init();
}

Shippo.prototype = {

  setAuthScheme: function(auth) {
    this.set('authScheme', auth);
  },

  setHost: function(host, port, protocol) {
    this.set('host', host);
    if (port) this.set('port', port);
    if (protocol) this.set('protocol', protocol);
  },

  setProtocol: function(protocol) {
    this.set('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this.set('port', port);
  },

  // token can be provided as a string, or as an object with either a 'shippoToken' or 'oauthToken' attribute
  setToken: function(token) {
    var shippoToken = (typeof token === 'object') ? token.shippoToken : token;
    var oauthToken = (typeof token === 'object') ? token.oauthToken : undefined;

    if (shippoToken && oauthToken) {
      throw new Shippo.Error.ShippoError({
        message: 'Ambiguous authentication credentials',
        detail: "Please provide either 'shippoToken' or 'oauthToken', not both"
      });
    }

    if (oauthToken) {
      this.set('authScheme', Shippo.AUTH_SCHEME_OAUTH);
      this.set('token', oauthToken);
    } else {
      this.set('authScheme', Shippo.AUTH_SCHEME_SHIPPO);
      this.set('token', shippoToken);  
    }

  },

  setTimeout: function(timeout) {
    this.set('timeout', timeout == null ? Shippo.DEFAULT_TIMEOUT : timeout);
  },

  set: function(key, value) {
    this._api[key] = value;
  },

  get: function(key) {
    return this._api[key];
  },

  _init: function() {
    for (var name in Shippo.resources) {
      if(Shippo.resources.hasOwnProperty(name)) {
        // "this" is the Shippo object being created
        // console.log('create %s', name);
        this[name.toLowerCase()] = new Shippo.resources[name](this);
      }
    }

    this.error = Shippo.Error;
  }

};

module.exports = Shippo;
