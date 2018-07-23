(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorsHomeCtrl", function ($scope, $localStorage) {
        var vm = this;
        $scope.logOut = function(){
          $localStorage.email = 0;
          $localStorage.password = 0;
          console.log('Log Out!')
        }
    });
}());
