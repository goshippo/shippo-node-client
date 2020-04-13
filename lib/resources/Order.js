'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'orders/',
  operations: ['create', 'list', 'retrieve']
});