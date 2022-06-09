'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'live-rates',
  operations: ['create'],
  parcel_template: method({
    method: 'GET',
    path: '/settings/parcel-template',
  }),
  update_parcel_template: method({
    method: 'PUT',
    path: '/settings/parcel-template'
  }),
  delete_parcel_template: method({
    method: 'DELETE',
    path: '/settings/parcel-template'
  })
});

