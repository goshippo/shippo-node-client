'use strict';

var path = require('path');
var utils = require('./utils');

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with 
 *  the instance's path (e.g. "addresses" or "shipments")
 * @param [spec.required=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceeding the also-optional callback argument, which always comes last)
 */
module.exports = function Method(spec) {

  var commandPath = utils.makeInterpolator( spec.path || '' );
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];
  var optional = false;  // check for optional parameters
  var optParam = 0;  // check if optional parameters are provided by the user
  var optPath = utils.makeInterpolator( spec.path || '' );
  var optPath2;
  if (spec.optPath !== undefined) {
	  optPath = utils.makeInterpolator(spec.optPath || '');
	  optional = true;
	  optParam =1;
  }
  if (spec.optPath2 !== undefined) {
	  optPath2 = utils.makeInterpolator(spec.optPath2 || '');
	  optional = true;
	  optParam = 2;
  }
  return function() {

    var self = this;
    var args = [].slice.call(arguments);

    var callback = typeof args[args.length - 1] == 'function' && args.pop();
    var auth = args.length > urlParams.length && typeof args[args.length - 1] == 'string' ? args.pop() : null;
    var data = utils.isObject(args[args.length - 1]) ? args.pop() : {};
    var urlData = this.createUrlData();

    var deferred = this.createDeferred(callback);

    for (var i = 0, l = urlParams.length; i < l; ++i) {
      var arg = args[0];
      if (urlParams[i] && !arg && !optional) {
        throw new Error('Shippo: I require argument "' + urlParams[i] + '", but I got: ' + arg);
      } //added handling for urlParams that are optional
	  if (optional && urlParams[i] && !arg) {
		  optParam = optParam - 1;
		  continue;
	  }
      urlData[urlParams[i]] = args.shift();
    }
	// commandPath depending on the number of optional parameters
	switch(optParam) {
	    case 1:
	        commandPath= optPath;
	        break;
	    case 2:
	        commandPath= optPath2;
	        break;
	    default:
			break;
	}
    var requestPath = this.createFullPath(commandPath, urlData);
    // console.log(requestPath);

    self._request(requestMethod, requestPath, data, auth, function(err, response) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(
          spec.transformResponseData ?
            spec.transformResponseData(response) :
            response
        );
      }
    });

    return deferred.promise;

  };
};
