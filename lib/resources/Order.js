'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'orders/',
  operations: ['create', 'list', 'retrieve'],
  validate: method({
    method: 'GET',
    path: '{id}/packingslip/',
    urlParams: ['id']
  })
});