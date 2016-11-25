'use strict';

angular.module('wolfhound.directives')

.directive('cookieWarning', function ($cookies) {
  return {
    restrict: 'A',
    templateUrl: '/assets/ng-templates/cookie-warning.html',
    link: function (scope){

      // defaults
      var cookieName = 'acceptCookiesCookie'
      var acceptCookie = $cookies.get(cookieName);
      var now = new Date(),
          exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

      // scope vars
      scope.showCookieWarning = false;

      if(acceptCookie === undefined) {
        scope.showCookieWarning = true;
      }

      scope.acceptCookies = function () {
        $cookies.put(cookieName, 1, { expires: exp });
        scope.showCookieWarning = false;
      }
    }
  }
});
