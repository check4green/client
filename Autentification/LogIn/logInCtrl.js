(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("indexCtrl", function ($location, $scope) {
        var vm = this;
          $scope.username = "name@yahoo.com";
          $scope.password = "pass123";
        $scope.authenticate = function(name, pass){
          if (name == $scope.username && pass == $scope.password){
            $location.path('/distance');
            $scope.nameError = false;
            $scope.passError = false;
          } else{
            if(name != $scope.username){
              $scope.nameError = true;
            }else{
              $scope.nameError = false;
            }
            if(pass != $scope.password){
              $scope.passError = true;
            }else{
              $scope.passError = false;
            }
          }
        }
});
}())
