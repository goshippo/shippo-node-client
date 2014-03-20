'use strict';

Shippo.DEFAULT_HOST = '127.0.0.1';
Shippo.DEFAULT_PROTOCOL = 'http';
Shippo.DEFAULT_PORT = '8000';
Shippo.DEFAULT_BASE_PATH = '/v1/';
Shippo.DEFAULT_TIMEOUT = require('http').createServer().timeout;
//require('../package.json').version;
Shippo.PACKAGE_VERSION = '0.01';

Shippo.USER_AGENT = 'shippo-node '+Shippo.PACKAGE_VERSION;

Shippo.resources = {
  Addresses: require('./resources/Addresses'),
  Shipments: require('./resources/Shipments'),
  Parcel: require('./resources/Parcels'),
  Transactions: require('./resources/Transactions')
};

Shippo.Resource = require('./Resource');

function Shippo(user, password) {

  if (!(this instanceof Shippo)) {
    return new Shippo(user, password);
  }


  this._api = {
    host: Shippo.DEFAULT_HOST,
    port: Shippo.DEFAULT_PORT,
    protocol: Shippo.DEFAULT_PROTOCOL,
    basePath: Shippo.DEFAULT_BASE_PATH,
    timeout: Shippo.DEFAULT_TIMEOUT,
    dev: false
  };

  if(typeof(user) !== 'undefined' && typeof(password) !== 'undefined') {
    this.setAuth(user, password);
  }

  this._init();
}

Shippo.prototype = {

  setHost: function(host, port, protocol) {
    this.set('host', host);
    if (port) this.set('port', port);
    if (protocol) this.set('protcol', protocol);
  },

  setProtocol: function(protocol) {
    this.set('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this.set('port', port);
  },

  setAuth: function(user, password) {
    this.set('user', user);
    this.set('password', password);
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
        console.log('create %s', name);
        this[name.toLowerCase()] = new Shippo.resources[name](this);
      }
    }
  }

};

module.exports = Shippo;
