'use strict';

angular.module('wolfhound.services')

.factory('dataService', function($http, $q) {

  return {
    getArticles: function () {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: '/assets/json/articles.json'
      }).then(function successCallback(response) {

        deferred.resolve(response);

        }, function errorCallback(response) {

        deferred.reject();
      });

      return deferred.promise;
    },
    getGithubCv: function () {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/harrymckillen/cv/master/details.json'
      }).then(function successCallback(response) {

        deferred.resolve(response);

        }, function errorCallback(response) {

        deferred.reject();
      });

      return deferred.promise;
    }
  }
 });
