/**
 * Prevent stack trace from being sent to user on error.
 */

'use strict';

var log = require('logmagic').local('lib.handlers.error');

module.exports = function(err, req, res, next) {
  /* jshint unused: false */
  log.error('handling app error', { 'error': err.stack });
  res.send(err.status || 500);
};
