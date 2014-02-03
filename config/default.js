'use strict';

module.exports = {
  appName: 'app',
  port: 3000,
  secret: 'change-me',
  env: 'dev',
  staticPath: 'app/public',
  bowerPath: 'app/bower-components',
  basePath: 'app',
  sessionStore: 'memory',
  googleAnalyticsId: 'UA-x-x',
  requestTimeout: 5000,
  proxy: {
    skipHeaders: [
      'x-forwarded-for',
      'x-forwarded-port',
      'x-forwarded-proto',
      'cookie'
    ],
    addHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'My App Proxy'
    },
    services: {
      'github': {
        'endpoint': 'https://api.github.com',
        'api_key': '',
        'token_name': 'access_token'
      }
    }
  },
  log: {
    level: 'INFO',
    sink: 'console'
  }
};
