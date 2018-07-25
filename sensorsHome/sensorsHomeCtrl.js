(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorsHomeCtrl", function ($scope, $localStorage, autentificationService) {
        var vm = this;
        $scope.username = $localStorage.email;
        $scope.logOut = function(){
          $localStorage.email = 0;
          $localStorage.password = 0;
        }
    });
}());
