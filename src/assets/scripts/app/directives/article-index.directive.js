'use strict';

angular.module('wolfhound.directives')

.directive('articleIndex', function (dataService, $cookies, $filter, $location, $anchorScroll) {
  return {
    restrict: 'A',
    transclude: false,
    templateUrl: '/assets/ng-templates/article.html',
    controller: function ($scope){

      // article cookie defaults
      var cookieName = 'articleFilters'
      var articleCookie = $cookies.get(cookieName);
      var now = new Date(),
          exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

      // array of post categories
      var categories = [];

      // hide filters by default
      $scope.filtersShown = false;

      // shows loading message
      $scope.loading = true;

      // pagination controls
      $scope.pagination = 10;
      $scope.currentPage = 1;

      // filter cookie
      if(articleCookie === undefined) {

        // default empty search filters
        $scope.searchFilters = {};
      } else {

        // read cookie, and set search values to values stored in cookie
        var parseCookie = JSON.parse(articleCookie);

        $scope.searchFilters = {
          'category': parseCookie.category,
          'text': parseCookie.text
        };
      }
      // load articles from dataService
      dataService.getArticles().then(function (response) {

        // assigns it to articles scope variable, immediately
          // reverses the array to display newest first
          $scope.articles = response.data.reverse();
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

          // access the filtered results array
          $scope.filteredResult = $filter('filter')($scope.articles);

          // create an original of the filtered results
          $scope.original = angular.copy($scope.filteredResult);

          $scope.filteredResult.splice($scope.pagination, $scope.filteredResult.length - 1);

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

      $scope.prevPage = function(){
        $scope.currentPage = $scope.currentPage - 1;
        changePage();
      }

      $scope.nextPage = function(){
        $scope.currentPage = $scope.currentPage + 1;
        changePage();
      }

      $scope.goToPage = function(value){
        $scope.currentPage = value;
        changePage();
      }

      var changePage = function(){

        // reset to the original posts object
        $scope.filteredResult = angular.copy($scope.original);

        var startpoint = (($scope.currentPage - 1) * $scope.pagination);

        var filteredResult = $scope.filteredResult.splice(startpoint, $scope.pagination);

        angular.copy(filteredResult, $scope.articles);

        // the element you wish to scroll to.
        $location.hash('top');

        // call $anchorScroll()
        $anchorScroll();
      }

      // watch changes to original filtered results
      $scope.$watch('original', function (newValue, oldValue) {
        if(newValue !== oldValue){

          // reset to currentpage
          $scope.currentPage = 1;

          // sets the number of pages
          $scope.noofpages = Math.ceil($scope.original.length / $scope.pagination);

          // page list array
          $scope.pageList = [];

          for(var i = 1; i <= $scope.noofpages; i++){
            $scope.pageList.push(i);
          }

        }
      }, true);

      /*$scope.$watch('articles', function (newValue, oldValue) {
        if(newValue !== oldValue){
          console.log('articles changed')
          console.log(newValue);
        }
      }, true);*/

      // watch changes to search filters, if changed, rewrite cookie
      $scope.$watch('searchFilters', function (newValue, oldValue) {

        if(newValue !== oldValue){
          $cookies.put(cookieName, JSON.stringify($scope.searchFilters), { expires: exp });
        }

      }, true);
    }
  }
});
