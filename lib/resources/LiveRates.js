'use strict';
var method = require('../Method');

module.exports = require('../Resource').extend({
  path: 'live-rates/',
  operations: ['create'],
  parcel_template: method({
    method: 'GET',
    path: 'settings/parcel-template',
  })
});