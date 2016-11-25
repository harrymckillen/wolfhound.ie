'use strict';

angular.module('wolfhound.directives')

.directive('lazyLoad', function ($window, $http, $timeout) {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attr){
      var elem = element[0],
          coords = elem.getBoundingClientRect(),
          windowHeight = $window.innerHeight,
          fallbackImage = '/assets/img/other/wmd-fallback.png';

      function isVisible(){
        if ((windowHeight + $window.pageYOffset) > coords.top &&
          attr.image !== attr.src){

          $http.get(attr.image)
          .success(function (response) {
            attr.$set('src', attr.image);
            $timeout(function() {
              attr.$set('status', 'loaded');
            }, 100);

          })
          .error(function () {
            attr.$set('src', fallbackImage);
            attr.$set('status', 'not-found');
          });
        }
      }

      // on scroll, make visible
      angular.element($window).bind('scroll', function () {
        if(attr.status !== 'loaded' || attr.status !== 'not-found'){
          isVisible();
        }
      });

      // on init load, determine if image is visible
      isVisible();
    }
  }
});
