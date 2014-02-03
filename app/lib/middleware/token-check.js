/**
 * Checks the session for an existing token.
 */

'use strict';

var log = require('logmagic').local('lib.middleware.tokenCheck'),
    tokenCheck;

tokenCheck = function(req, res, next) {
  log.debug('checking for auth token in session');

  // Give response access to session variables for use in view rendering etc.
  res.locals.session = req.session;

  // Token exists, all is good.
  if (req.session.hasOwnProperty('token')) {
    log.debug('auth token found');
    next();
    return;
  }
  log.debug('auth token not found');
  res.send(401);
};

module.exports = tokenCheck;
