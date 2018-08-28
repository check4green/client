(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("forgotPasswordCtrl", function ($scope, autentificationService, $location, $sessionStorage){
    var vm = this;
    $scope.recoverPass = function(inputEmail){
      $scope.email = {email: inputEmail}
      autentificationService.getCode($scope.email)
        .then(function(){
          vm.showError = false;
          $location.path('/resetPassword');
          console.log(' Click!');
          $sessionStorage.inputEmail = inputEmail;
        })
        .catch(function(response){
          vm.showError = true;
          if (!inputEmail){
            $scope.message ='You have to enter an email address'
          } else{
            $scope.message =response.data.message;
          }
        })
    }
  });
}());
