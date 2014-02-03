/**
 * This module applies the connect csrf middleware,
 * sets a session cookie with the token,
 * and parses the token from the expected header.
 */

'use strict';

var log = require('logmagic').local('app.lib.middleware.customCsrf'),
    express = require('express');

var getCsrfValue = function(req) {
  var token = req.headers['x-xsrf-token'];
  if (!token) {
    log.info('CSRF Token not provided.');
  }
  return token;
};

module.exports = {

  applyToApp: function(app) {
    app.use(express.csrf({ value: getCsrfValue }));
    app.use(this.middleware);
  },

  middleware: function(req, res, next) {
    log.debug('Setting CSRF token from session.');
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  }

};
