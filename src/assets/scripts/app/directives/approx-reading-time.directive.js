'use strict';

angular.module('wolfhound.directives')

.directive('approxReadingTime', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attr){

      // standard average word per minute read count
      var avgWPM = 200,

      // get the entire content of the html element
      text = document.body.innerHTML;

      // remove any html tags from the string object
      text = text.replace(/(<([^>]+)>)/ig,"");

      // from what is remaining, split the string by spaces into what I determine
      // to be a word, it's a guess. Assign it to an array.
      var words = text.split(" ");

      // divide the number of words in the array by the avgWPM
      scope.approxReadingTime = Math.ceil(words.length / avgWPM);
    }
  }
});
