'use strict';

var Method = require('./Method');
var utils = require('./utils');

module.exports = {

  create: Method({
    method: 'POST'
  }),

  list: Method({
    method: 'GET',
	path: '',
	optPath: '/?results={size}',
	optPath2: '/?page={page}&results={size}',
	urlParams: ['size','page']
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
