'use strict';

angular.module('wolfhound.directives')

.directive('cookieWarning', function ($cookies) {
  return {
    restrict: 'A',
    templateUrl: '/assets/ng-templates/cookie-warning.html',
    link: function (scope){

      // local variables
      var cookieName = 'acceptCookiesCookie'
      var acceptCookie = $cookies.get(cookieName);
      var now = new Date(),
          exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

      // scope variable
      scope.showCookieWarning = false;

      // if cookie does not exist, show cookie warning
      if(acceptCookie === undefined) {
        scope.showCookieWarning = true;
      }

      // accept cookies function, when button clicked, it sets a cookie
      // which expires 1 year from now
      scope.acceptCookies = function () {
        $cookies.put(cookieName, 1, { expires: exp });
        scope.showCookieWarning = false;
      }
    }
  }
});
