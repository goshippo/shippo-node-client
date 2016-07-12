'use strict';

var Method = require('./Method');
var utils = require('./utils');

module.exports = {

  create: Method({
    method: 'POST'
  }),

  list: Method({
    method: 'GET',
	path: ''
  }),

  retrieve: Method({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id']
  }),

  update: Method({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

};
