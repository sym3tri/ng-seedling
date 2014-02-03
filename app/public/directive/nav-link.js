/**
 * Simple directive to create bootstrap friendly navbar links.
 * Will automatically add the 'active' class based on the route.
 */

'use strict';

angular.module('appDirectives').directive('navLink', function($location) {

  return {

    templateUrl: '/directive/nav-link.html',
    transclude: true,
    restrict: 'E',
    replace: true,
    scope: {
      // The path to link to.
      'href': '@',
      // Optionally reset search params. Default is true.
      'resetSearch': '@'
    },

    link: function postLink(scope) {

      scope.isActive = function() {
        return $location.path() === scope.href;
      };

      scope.followLink = function() {
        if (scope.resetSearch) {
          $location.path(scope.href);
        } else {
          $location.url(scope.href);
        }
      };

    }

  };

});
