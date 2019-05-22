(function(){
  "use strict";
 var app = angular.module("sensorApp");
 app.controller("homeCtrl", function ($scope, $localStorage, $sessionStorage, $window, $location, $timeout) {
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
      $scope.goToHome = function(){
        if($sessionStorage.netId){
          $location.path('/sensorsHome/sensors');
        } else{
          $location.path('/sensorsHome/networks');
          $timeout(function(){
            $window.location.reload();

        }, 100)
        }
      }
      $scope.logOut = function(){
        $sessionStorage.email =0;
        $sessionStorage.password=0;
        vm.log = true;
      }
  });
}());
