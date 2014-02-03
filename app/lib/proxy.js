'use strict';

var _ = require('underscore'),
    querystring = require('querystring'),
    log = require('logmagic').local('lib.proxy'),
    urllib = require('url'),
    httpProxy = require('http-proxy');

function Proxy(config) {
  this.config = config;
  this._proxy = new httpProxy.RoutingProxy({
    changeOrigin: true,
    enable: {
      xforward: true
    },
    target: {
      https: true
    }
  });
  this._proxy.on('proxyResponse', this._proxyResponse.bind(this));
  this._proxy.on('proxyError', this._proxyError.bind(this));
}

/**
 * On proxy response.
 */
Proxy.prototype._proxyResponse = function(req, res, response) {
  log.info('Proxied Response', {
    url: req.url,
    time: ((new Date()).getTime() - req.startTime) + 'ms',
    ip: req.ip,
    code: response.statusCode
  });
};

/**
 * Handle proxy errors.
 */
Proxy.prototype._proxyError = function(err, req, res) {
  log.error('Error on Proxied Request', {
    err: err,
    url: req.url,
    time: ((new Date()).getTime() - req.startTime) + 'ms',
    ip: req.ip,
    code: 500
  });

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.write('Internal Server Error');
  res.end();
};

/**
 * Parse the unique service name out of the requested url.
 */
Proxy.prototype.parseServiceName = function(url) {
  return urllib.parse(url).path.split('/')[2].toLowerCase();
};

/**
 * Map a unique service name to an endpoint from the config.
 */
Proxy.prototype.mapServiceUrl = function(reqUrl) {
  return urllib.parse(this.config.services[this.parseServiceName(reqUrl)]);
};

/**
 * Configure the endpoint host and port.
 */
Proxy.prototype.configureEndpoint = function(reqUrl, endpointUrl) {
  var endpoint;

  endpoint = {
    host: endpointUrl.host,
    port: endpointUrl.port
  };
  if (endpointUrl.protocol === 'https:') {
    endpoint.https = true;
    if (!endpoint.port) {
      endpoint.port = 443;
    }
  }
  else {
    if (!endpoint.port) {
      endpoint.port = 80;
    }
  }
  return endpoint;
};

/**
 * Modify headers based on configuration.
 */
Proxy.prototype.modifyHeaders = function(req) {
  // Remove configured headers to skip.
  _.each(req.headers, function(value, key) {
    if (_.contains(this.config.skipHeaders, key.toLowerCase())) {
      delete req.headers[key];
    }
  });

  // Add configured headers to add.
  _.extend(req.headers, this.config.addHeaders);

  // Add the required token to the request.
  _.extend(req.headers, {
    'X-Auth-Token': req.session.tokens[this.parseServiceName(req.url)]
  });
};

/**
 * Make the request.
 */
Proxy.prototype.request = function(req, res) {
  var endpointUrl, endpoint;

  this.modifyHeaders(req);
  endpointUrl = this.mapServiceUrl(req.url);
  endpoint = this.configureEndpoint(req.url, endpointUrl);
  req.url = endpointUrl.pathname + '/' +
            req.params[0].split('/').slice(2).join('/');

  if (!_.isEmpty(req.query)) {
    req.url += '?' + querystring.stringify(req.query);
  }

  log.debug('Starting Proxied request', {
    endpoint: endpoint,
    url: req.url,
    ip: req.ip,
  });

  req.startTime = (new Date()).getTime();

  this._proxy.proxyRequest(req, res, endpoint);
};

module.exports = Proxy;
