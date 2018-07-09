angular.module("sensorApp")
        .controller("indexCtrl", function($location, $scope){
          var login=[{
            "username": "name",
            "password": "pass123"
          }];
          $scope.authenticate = function (user, pass){
            if (user==login.name && pass==login.password){
              $location.path('/distance')
              $scope.error = false;
            }else{
              $scope.error = true;
            }
          }
        })
