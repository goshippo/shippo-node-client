'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'addresses/',
  operations: ['create', 'list', 'retrieve'],
  validate: method({
    method: 'GET',
    path: '{id}/validate/',
    urlParams: ['id']
  })
});