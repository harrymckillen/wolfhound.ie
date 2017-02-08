'use strict';

angular.module('wolfhound.directives')

.directive('articleIndex', function (dataService, $cookies) {
  return {
    restrict: 'A',
    transclude: false,
    templateUrl: '/assets/ng-templates/article.html',
    controller: function ($scope){

      var cookieName = 'articleFilters'
      var articleCookie = $cookies.get(cookieName);
      var now = new Date(),
          exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

      // filter cookie
      if(articleCookie === undefined) {

        // default empty search filters
        $scope.searchFilters = {};

      } else {

        // read cookie, and set search values to values stored in cookies
        var parseCookie = JSON.parse(articleCookie);

        $scope.searchFilters = {
          'category': parseCookie.category,
          'text': parseCookie.text
        };
      }

      // watch changes to search filters, if changed, rewrite cookie
      $scope.$watch('searchFilters', function (newValue, oldValue) {

        if(newValue !== oldValue){
          $cookies.put(cookieName, JSON.stringify($scope.searchFilters), { expires: exp });
        }

      }, true);

      // array of post categories
      var categories = [];

      // hide filters by default
      $scope.filtersShown = false;

      // shows loading message
      $scope.loading = true;

      // load articles from
      dataService.getArticles().then(function (data) {

        // assigns it to articles scope variable, immediately
          // reverses the array to display newest first
          $scope.articles = data.reverse();
          $scope.newestFirst = true;

          // hides loading message
          $scope.loading = false;

          // get all post categories
          _.forEach($scope.articles, function(article) {
            categories.push(article.categories);
          });

          // remove duplicate categories
          categories = _.uniq(categories);

          // create scope categories array object
          $scope.categories = categories;
      }, function (reason) {
        console.error(reason);
      });

      // simple function to reverse order
      $scope.reverse = function(){
        $scope.articles.reverse();
        $scope.newestFirst = !$scope.newestFirst;
      }

      // function to show filter
      $scope.showFilters = function(){
        $scope.filtersShown = !$scope.filtersShown;
      }

      // clear search filters
      $scope.clearFilters = function(){
        $scope.searchFilters = {};
        $cookies.remove(cookieName);
      }
    }
  }
});
