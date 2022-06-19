'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'user-parcel-templates/',
  operations: ['create', 'list', 'retrieve', 'update'],
  delete: method({
    method: 'DELETE',
    path: '/{id}'
  })
});