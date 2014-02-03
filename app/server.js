var express = require('express'),
    path = require('path'),
    logmagic = require('logmagic'),
    routes = require('./lib/routes'),
    handlers = require('./lib/handlers'),
    middleware = require('./lib/middleware'),
    //Proxy = require('./lib/proxy'),
    MemoryStore = express.session.MemoryStore,
    APP_CONFIG = require('config'),
    log = logmagic.local(APP_CONFIG.appName),
    sessionStore,
    //proxy,
    server;

logmagic.route('__root__', logmagic[APP_CONFIG.log.level], APP_CONFIG.log.sink);

//proxy = new Proxy(APP_CONFIG);

if (APP_CONFIG.sessionStore === '') {
  // TODO: replace with another supported store
  sessionStore = new MemoryStore();
} else {
  sessionStore = new MemoryStore();
}

server = express();
server.set('env', APP_CONFIG.env);
server.use(express.compress());
server.use(express.cookieParser());
server.use(express.session({
  key: [APP_CONFIG.appName, '.sessionId'].join(''),
  secret: APP_CONFIG.secret,
  store: sessionStore
}));
middleware.customCsrf.applyToApp(server);
server.use('/', express.static(APP_CONFIG.staticPath));
//server.use('/', express.static(path.join(__dirname, APP_CONFIG.staticPath)));
server.use('/bower-components', express.static(APP_CONFIG.bowerPath));

// Configure views
server.set('views', path.normalize(__dirname + '/lib/view'));
server.set('view engine', 'hjs');

// Setup routes.
routes.setup(server, handlers);
server.use(server.router);

// Only start server if file is run directly, not if it's required.
if (__filename === process.argv[1]) {
  server.listen(APP_CONFIG.port);
  log.info('listening on port ' + APP_CONFIG.port);
}

// Export server for testing.
module.exports = server;
