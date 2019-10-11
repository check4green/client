(function(){
  "use strict";
  var app = angular.module("sensorApp");
  app.controller("sensorsHomeCtrl", function ($scope, $sessionStorage, $window, $location, $localStorage, autentificationService, SENSOR_TYPE, sensorModelService) {
      var vm = this;
      vm.titleGrid = SENSOR_TYPE.TITLE;
      if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
        var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
      }else{
        var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
      }
      if(!$sessionStorage.netId){
        $scope.noNetworkSelected = true;
        document.getElementById('gatewaysMenu').style.pointerEvents='none';
        document.getElementById('sensorsMenu').style.pointerEvents='none';
      }else{
        $scope.noNetworkSelected = false;
        document.getElementById('gatewaysMenu').style.pointerEvents='all';
        document.getElementById('sensorsMenu').style.pointerEvents='all';

      }
      $scope.cancelCards = function(){
        $sessionStorage.showNetworkDetails = false;
      }
      autentificationService.getUser(encodeduser)
        .then(function(response){
            $scope.user = response.data;
            vm.firstName = $scope.user.firstName;
            vm.lastName =  $scope.user.lastName;
            vm.username = vm.firstName + ' '+ vm.lastName;
        })
      $scope.logOut = function(){
        if($localStorage.email && $localStorage.password){
          $localStorage.email =0;
          $localStorage.password =0;
          $sessionStorage.email = 0;
          $sessionStorage.password = 0;
        } else{
          $sessionStorage.email = 0;
          $sessionStorage.password = 0;
        }
      }
  });
}());
