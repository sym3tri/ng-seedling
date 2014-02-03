'use strict';

/**
 * Log each requested route.
 */

var log = require('logmagic').local('app.lib.middleware.routeLogger');

module.exports = function(req, res, next) {
  log.info(req.method + ': ' + req.url);
  next();
};
