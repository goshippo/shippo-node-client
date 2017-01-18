'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'batches/',
  operations: ['create'],
  retrieve: method({
    method: 'GET',
    path: '{id}',
    optPath: '{id}?page={page}',
    optPath2: '{id}?page={page}&object_results={filter}',
    urlParams: ['id', 'page', 'filter']
  }),
  add: method({
    method: 'POST',
    path: '{id}/add_shipments/',
    urlParams: ['id']
  }),
  remove: method({
    method: 'POST',
    path: '{id}/remove_shipments/',
    urlParams: ['id']
  }),
  purchase: method({
    method: 'POST',
    path: '{id}/purchase/',
    urlParams: ['id']
  })
});

