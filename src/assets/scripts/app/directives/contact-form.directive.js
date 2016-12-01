'use strict';

angular.module('wolfhound.directives')

.directive('contactForm', function () {
  return {
    restrict: 'A',
    scope: false,
    controller: function ($scope, $http, $q, $location){

      $scope.showSuccess = false;
      $scope.queryOptions = [
        'Hiring Me',
        'I have a glaring spelling/grammar mistake somewhere'
      ];

      if($location.path() === '/hire-me'){
        $scope.query = $scope.queryOptions[0];
      }

      $scope.env = $location.host() === 'www.wolfhound.ie' ? 'live' : 'dev';

      $scope.showError = {
        name: false,
        email: false,
        query: false,
        message: false
      };


      $scope.errorMessages = {
        requiredField: 'You\'ll have to add something in this field, sorry.',
        alphaOnly: ' You have entered incorrect characters. This field only accepts letters. No numbers, or special characters are allowed.',
        validEmail: 'Make sure the e-mail address is valid.'
      }

      $scope.checkValidity = function (field, validity) {
        if (validity) {
          $scope.showError[field] = false;
        }
      }

      $scope.submitForm = function (formObject) {
        if (formObject.$valid) {
          angular.forEach($scope.showError, function(value, key) {
            $scope.showError[key] = false;
          });

          $scope.submission = {
            'name': formObject.name.$viewValue,
            'lastname': formObject.lastname.$viewValue,
            'email': formObject.email.$viewValue,
            'query': formObject.query.$viewValue,
            'message': formObject.message.$viewValue,
            'env': $scope.env
          };

          $http.post('/php/contact.php', $scope.submission)
          .success(function (response) {
            if(response.status === 'huzzah'){
              $scope.showSuccess = true;

              if(window._gaq){
                _gaq.push(['_trackEvent', 'Contact Form', 'Send', 'Successful :)']);
              }
            } else {
              $scope.showSuccess = true;

              if(window._gaq){
                _gaq.push(['_trackEvent', 'Contact Form', 'Send', 'Successful ;)']);
              }
            }
          })
          .error(function () {
            if(window._gaq){
              _gaq.push(['_trackEvent', 'Contact Form', 'Error', 'Sending the message failed']);
            }
          });
        } else {
          angular.forEach($scope.showError, function(value, key) {
            formObject[key].$invalid ? $scope.showError[key] = true : $scope.showError[key] = false;
          });
        }
      }
    }
  }
});
