'use strict';

angular.module('wolfhound.directives')

.directive('activeMenuLink', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr){

      // get the absolute URL
      var absUrl = $location.absUrl();

      // if the a href is contained in the absolute URL, set the active class
      if(absUrl.indexOf(attr.href) > 0 && attr.href !== '/'){
        attr.$set('class', 'active');
      }
    }
  }
});
