'use strict';

angular.module('wolfhound.directives')

.directive('menuButton', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element){

      // local variables
      var closedMenuText = 'Menu',
          openMenuText = 'Close',
          tablet = 767;

      // scope variables
      scope.buttonText = closedMenuText;
      scope.menuShown = false;

      // bind to window on resize
      angular.element($window).bind('resize', function(){

        // if width of page is greater than tablet and the menu is shown, then hide it
        if($window.innerWidth > tablet && scope.menuShown) scope.menuShown = false;
        scope.$digest();
      });

      // toggle the menu visibility
      scope.toggle = function () {

        // set menuShown to opposite of current value
        scope.menuShown = !scope.menuShown;

        // if menuShown is true, set to open text
        if(scope.menuShown) scope.buttonText = openMenuText;

        // else, set to closed text
        else scope.buttonText = closedMenuText;
      }

    }
  }
});
