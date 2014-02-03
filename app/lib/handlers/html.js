'use strict';

var APP_CONFIG = require('config');

/**
 * Send the index.html page, single-page-app FTW!
 */
module.exports = function(req, res) {
  res.render('index', {
    globals: JSON.stringify({
      googleAnalyticsId: APP_CONFIG.googleAnalyticsId,
      environment: APP_CONFIG.env
    }),
  });
};
