(function() {
  'use strict';

  var appDirectives, app;
  // Put all directives into a separate module.
  appDirectives = angular.module('appDirectives', []);
  // The main app module.
  app = angular.module('app', [
    'appDirectives',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'templates-main',
    'jmdobry.angular-cache',
    'underscore',
    'jquery'
  ]);

  // Routes
  app.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: '/module/home/home.html'
      })
      .when('/about', {
        controller: 'AboutCtrl',
        templateUrl: '/module/about/about.html'
      })
      .otherwise({
        templateUrl: '/404.html'
      });

  });

}());
