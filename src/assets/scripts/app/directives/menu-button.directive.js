'use strict';

angular.module('wolfhound.directives')

.directive('menuButton', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element){
      // local vars
      var closedMenuText = 'Menu',
          openMenuText = 'Close',
          tablet = 767;

      scope.buttonText = closedMenuText;
      scope.menuShown = false;

      angular.element($window).bind('resize', function(){
        if($window.innerWidth > tablet && scope.menuShown) scope.menuShown = false;
        scope.$digest();
      });

      scope.toggle = function () {
        scope.menuShown = !scope.menuShown;
        if(scope.menuShown) scope.buttonText = openMenuText;
        else scope.buttonText = closedMenuText;
      }

    }
  }
});
