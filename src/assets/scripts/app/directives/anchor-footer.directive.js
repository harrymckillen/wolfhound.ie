'use strict';

angular.module('wolfhound.directives')

.directive('anchorFooter', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element){

      //local var(s)
      var contentClass = '.the-grid',
          contentHeight = $(contentClass).height(),
          windowHeight = $window.innerHeight;

      //scope var(s)
      scope.anchored = false;

      function achorFooter(windowHeight, contentHeight) {
        console.log('windowHeight: '+ windowHeight);
        console.log('contentHeight: '+ contentHeight);
        ((contentHeight + 200) < windowHeight) ? scope.anchored = true : scope.anchored = false;
      }

      // init
      achorFooter(windowHeight, contentHeight);

      // on resize
      angular.element($window).bind('resize', function(){
        windowHeight = $window.innerHeight;
        contentHeight = $(contentClass).height();

        console.log('Resized: ');
        console.log('windowHeight: '+ windowHeight);
        console.log('contentHeight: '+ contentHeight);

        achorFooter(windowHeight, contentHeight);

        scope.$digest();
      });

    }
  }
});
