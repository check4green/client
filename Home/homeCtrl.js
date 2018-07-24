(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("homeCtrl", function ($scope,$localStorage) {
        var vm = this;
        $localStorage.email = 0;
        $localStorage.password = 0;
        if(($localStorage.email !=0) && ($localStorage.password!=0)){
          vm.log = false;
        }else{
          vm.log = true;
        }
        $scope.logOut = function(){
          $localStorage.email = 0;
          $localStorage.password = 0;
          console.log('Log Out!');
          vm.log = true;
        }
    });
}());
