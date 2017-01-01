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

      // is visible function
      function isVisible(){

        // if the window height and page offset are greater than
        // the location of the image, and the image and src attr
        // are not equal
        if ((windowHeight + $window.pageYOffset) > coords.top &&
          attr.image !== attr.src){

          // get image from attr.image
          $http.get(attr.image)
          .success(function (response) {

            // if found, set src to image attr
            attr.$set('src', attr.image);

            // wait 100 milliseconds, set status attr
            $timeout(function() {
              attr.$set('status', 'loaded');
            }, 100);

          })
          .error(function () {

            // if not found, set fallback image, and status to not found
            attr.$set('src', fallbackImage);
            attr.$set('status', 'not-found');
          });
        }
      }

      // on scroll, make visible
      angular.element($window).bind('scroll', function () {

        // if not already loaded, or not set to not-found, check if image
        // is visible or not
        if(attr.status !== 'loaded' || attr.status !== 'not-found'){
          isVisible();
        }
      });

      // on init load, determine if image is visible
      isVisible();
    }
  }
});
