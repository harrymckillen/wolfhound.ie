'use strict';

angular.module('wolfhound.services')

.factory('dataService', function($http, $q) {

  return {
    getArticles: function () {

      var deferred = $q.defer();

      $http.get('/assets/json/articles.json')
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function (){
          deferred.reject();
        });

      return deferred.promise;
    }
  }
 });
