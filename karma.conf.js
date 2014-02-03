var path = require('path'),
    APP_CONFIG = require('config');

module.exports = function(config) {

  function bowerPath(dir) {
    return path.join(APP_CONFIG.bowerPath, dir);
  }

  function staticPath(dir) {
    return path.join(APP_CONFIG.staticPath, dir);
  }

  config.set({

    // Base path, that will be used to resolve files and exclude.
    basePath: __dirname,

    // Test framework to use.
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // TODO: programatically generate list of bower components
      bowerPath('/angular/angular.min.js'),
      bowerPath('/angular-route/angular-route.min.js'),
      bowerPath('/angular-resource/angular-resource.min.js'),
      bowerPath('/angular-mocks/angular-mocks.js'),
      bowerPath('/angular-cache/dist/angular-cache.min.js'),
      bowerPath('/angular-bootstrap/ui-bootstrap-tpls.min.js'),
      bowerPath('/underscore/underscore-min.js'),
      bowerPath('/underscore.string/dist/underscore.string.min.js'),
      bowerPath('/jquery/jquery.min.js'),
      bowerPath('/d3/d3.min.js'),

      // Test helper files
      'spec/util/**/*.js',
      'spec/mock/**/*.js',
      'spec/**/*.spec.js',

      // Actual client-side code.
      staticPath('/**/*.js')
      //staticPath('/module/**/*.html')
      //staticPath('/directive/**/*.html')
    ],

    //preprocessors: {
      //'module/**/*.html': 'html2js',
      //'directive/**/*.html': 'html2js'
    //},

    reporters: ['progress'],

    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    colors: true,

    // LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Continuous Integration mode.
    // If true, it capture browsers, run tests and exit.
    singleRun: true

  });

};
