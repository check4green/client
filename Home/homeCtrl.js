(function(){
  "use strict";
 var app = angular.module("sensorApp");
 app.controller("homeCtrl", function ($scope, $localStorage, $sessionStorage, $window) {
      var vm = this;
      if($localStorage.email && $localStorage.password && ($localStorage.email !=0 && $localStorage.password !=0)){
        vm.log = false;
      }else{
        vm.log = true;
        if($sessionStorage.email && $sessionStorage.password && ($sessionStorage.email !=0 && $sessionStorage.password !=0)){
        vm.log = false;
      }else {
        vm.log = true;
      }
    }
      $scope.hideContent = function(){
        $scope.homeContent = false;
        $sessionStorage.homeContent = false;
      }
      $scope.showContent = function(){
        $scope.homeContent = true;
        $sessionStorage.homeContent = true;
      }
      $scope.logOut = function(){
        $sessionStorage.email =0;
        $sessionStorage.password=0;
        vm.log = true;
      }
  });
}());
