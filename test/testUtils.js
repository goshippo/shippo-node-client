'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

// Ensure we are using the 'as promised' libs before any tests are run:

require('chai');

var utils = module.exports = {

  getUserShippoKey: function() {
    return process.env.SHIPPO_TEST_API_KEY || ('unittest');
  },

  getSpyableShippo: function(token) {
    // Provide a testable shippo instance
    // That is, with mock-requests built in and hookable

    var Shippo = require('../lib/shippo');
    var shippoInstance = Shippo(token || 'fakeAuthToken');

    shippoInstance.REQUESTS = [];

    for (var i in shippoInstance) {
      if (shippoInstance[i] instanceof Shippo.Resource) {

        // Override each _request method so we can make the params
        // avaialable to consuming tests (revealing requests made on
        // REQUESTS and LAST_REQUEST):
        shippoInstance[i]._request = function(method, url, data, auth, cb) {
          var req = shippoInstance.LAST_REQUEST = {
            method: method,
            url: url,
            data: data
          };
          if (auth) req.auth = auth;
          shippoInstance.REQUESTS.push(req);
          cb.call(this, null, {});
        };

      }
    }

    return shippoInstance;

  },

  /**
   * A utility where cleanup functions can be registered to be called post-spec.
   * CleanupUtility will automatically register on the mocha afterEach hook,
   * ensuring its called after each descendent-describe block.
   */
  CleanupUtility: (function() {

    CleanupUtility.DEFAULT_TIMEOUT = 20000;

    function CleanupUtility(timeout) {
      var self = this;
      this._cleanupFns = [];
      this._shippo = require('../lib/shippo')(
        utils.getUserShippoKey(),
        'latest'
      );
      afterEach(function(done) {
        this.timeout(timeout || CleanupUtility.DEFAULT_TIMEOUT);
        return self.doCleanup(done);
      });
    }

    CleanupUtility.prototype = {

      doCleanup: function(done) {
        var cleanups = this._cleanupFns;
        var total = cleanups.length;
        var completed = 0;
        for (var fn; fn = cleanups.shift();) {
          var promise = fn.call(this);
          if (!promise || !promise.then) {
            throw new Error('CleanupUtility expects cleanup functions to return promises!');
          }
          promise.then(function() {
            // cleanup successful
            ++completed;
            if (completed === total) {
              done();
            }
          }, function(err) {
            // not successful
            throw err;
          });
        }
        if (total === 0) done();
      },
      add: function(fn) {
        this._cleanupFns.push(fn);
      },
      deleteAddress: function(addId) {
        this.add(function() {
          return this._shippo.address.del(addId);
        });
      }
    };

    return CleanupUtility;

  }())

};
