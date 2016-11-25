'use strict';

angular.module('wolfhound.directives')

.directive('activeMenuLink', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr){
      var absUrl = $location.absUrl();
      if(absUrl.indexOf(attr.href) > 0 && attr.href !== '/'){
        attr.$set('class', 'active');
      }
    }
  }
});
