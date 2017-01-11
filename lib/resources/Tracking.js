'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'tracks/',
  operations: ['create'],
  track: method({
    method: 'GET',
    path: '{carrier}/{trackingNumber}/',
    urlParams: ['carrier', 'trackingNumber']
  })
});