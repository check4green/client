(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("homeCtrl", function ($scope,$localStorage) {
        var vm = this;
        if(($localStorage.email !=0) && ($localStorage.password!=0)){
          vm.log = false;
        }else{
          vm.log = true;
        }
        $scope.logOut = function(){
          $localStorage.email = 0;
          $localStorage.password = 0;
          vm.log = true;
        }
    });
}());
