'use strict';

angular.module('wolfhound.directives')

.directive('approxReadingTime', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attr){
      var avgWPM = 200,
      text = document.body.innerHTML;
      text = text.replace(/(<([^>]+)>)/ig,"");
      var words = text.split(" ");
      scope.approxReadingTime = Math.ceil(words.length / avgWPM);
    }
  }
});
