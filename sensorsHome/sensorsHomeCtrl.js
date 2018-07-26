(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorsHomeCtrl", function ($scope, $sessionStorage, $localStorage) {
        var vm = this;
        $scope.logOut = function(){
          if($localStorage.email && $localStorage.password){
            $localStorage.email =0;
            $localStorage.password =0;
          } else{
          $sessionStorage.email = 0;
          $sessionStorage.password = 0;
        }
        }
    });
}());
