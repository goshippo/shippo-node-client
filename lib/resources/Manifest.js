'use strict';

module.exports = require('../Resource').extend({
  path: 'manifests/',
  operations: ['create', 'list', 'retrieve']
});

