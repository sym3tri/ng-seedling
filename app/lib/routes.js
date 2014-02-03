'use strict';

var express = require('express'),
    middleware = require('./middleware');

exports.setup = function(server, handlers) {
  server.all('*', middleware.routeLogger);

  //server.all('/proxy/*', middleware.tokenCheck, proxy.request.bind(proxy));

  server.all('/api/*', express.bodyParser());
  server.post('/api/logout', handlers.api.logout);
  server.get('/api/user', middleware.tokenCheck, handlers.api.user);

  // Always serve index.html for any non-matching routes.
  server.get('/*', handlers.html);
  server.use(handlers.error);
};
