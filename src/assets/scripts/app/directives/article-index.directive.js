'use strict';

angular.module('wolfhound.directives')

.directive('articleIndex', function ($location) {
  return {
    restrict: 'A',
    templateUrl: '/assets/ng-templates/article.html',
    controller: function ($scope, $http){

      // array of post categories
      var categories = [];

      //retrieves the complete list of articles
      $http.get('/assets/json/articles.json')
        .success(function (response) {

          // assigns it to articles scope variable, immediately
          // reverses the array to display newest first
          $scope.articles = response.reverse();

          // get all post categories
          _.forEach($scope.articles, function(article) {
            categories.push(article.categories);
          });

          // remove duplicate categories
          categories = _.uniq(categories);
        })
        .error(function () {
          console.error('Failed to load articles.json');
        });

      // simple function to reverse order
      $scope.reverse = function(){
        $scope.articles.reverse();
      }
    }
  }
});
