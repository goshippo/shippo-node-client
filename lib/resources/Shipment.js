'use strict';
var method = require('../Method');
module.exports = require('../Resource').extend({
  path: 'shipments/',
  operations: ['create', 'list', 'retrieve'],
  rates: method({
	     method: 'GET',
	     path: '{id}/rates/',
		 optPath: '{id}/rates/{currency}',
		 urlParams: ['id','currency'],
	   })

});

