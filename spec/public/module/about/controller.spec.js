'use strict';

describe('AboutCtrl', function () {

  // Load the controller's module.
  beforeEach(module('app'));

  // Load the template.
  //beforeEach(module('module/about/about.html'));

  var aboutCtrl, $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    aboutCtrl = $controller('AboutCtrl', {
      $scope: $scope
    });
  }));

  it('has the hello property set correctly', function () {
    expect($scope.hello).toBe('hello world');
  });

});
