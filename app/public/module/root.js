(function() {
  'use strict';

  angular.module('app')
  .controller('RootCtrl', function($rootScope) {

    //$rootScope.$on('$routeChangeError', function () {
      //$location.url('/404');
    //});

    $rootScope.global = 'test';
    $rootScope.title = 'My App';
    angular.noop();
  });

}());
