'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'service-groups/',
  operations: ['list', 'retrieve'],
  delete : method({
    method: 'DELETE',
    path: '/{id}',
    urlParams: ['id']
  }),
});

