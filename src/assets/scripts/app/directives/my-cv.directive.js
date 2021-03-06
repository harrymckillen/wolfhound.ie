'use strict';

angular.module('wolfhound.directives')

.directive('myCv', function (dataService) {
  return {
    restrict: 'A',
    transclude: false,
    controller: function ($scope){

      // load CV from dataService
      dataService.getGithubCv().then(function (response) {

        // assign returned data to cv scope variable
        $scope.generalInfo = response.data.general;
        $scope.skillset = response.data.skills;

        // find current role
        _.forEach(response.data.experience, function(role) {
          if (role.current){
            $scope.currentRole = role;
          }
        });

      }, function (reason) {
        console.error(reason);
        $scope.errorLoadingCV = true;
      });

    }
  }
});
