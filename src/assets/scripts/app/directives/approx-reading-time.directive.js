'use strict';

angular.module('wolfhound.directives')
.controller('approxReadingTimeCtrl')
.directive('approxReadingTime', function () {
  return {
    restrict: 'A',
    replace: true,
    scope: true,
    template: '<span>{{::approxReadingTime}} mins read</span>',
    controller: approxReadingTimeCtrl
  }
});

function approxReadingTimeCtrl($scope, $document) {

  $scope.getApproxReadingTime = function (text, average) {

    // remove any html tags from the string object
    text = text.replace(/(<([^>]+)>)/ig,"");

    // from what is remaining, split the string by spaces into what I determine
    // to be a word, it's a guess. Assign it to an array.
    var words = text.split(" ");

    // divide the number of words in the array by the avgWPM, and return the rounded up value
    return Math.ceil(words.length / average);
  }

  // assign value to scope
  $scope.approxReadingTime = $scope.getApproxReadingTime($document[0].body.innerHTML, 200);
}
