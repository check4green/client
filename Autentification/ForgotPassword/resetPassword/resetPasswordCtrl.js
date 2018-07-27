(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("resetPasswordCtrl", function ($scope, autentificationService, $location, $sessionStorage) {
        var vm = this;
        vm.showStartMessage = true;
        $scope.showStartMessage = 'Please check your email. The code we sent you is avaible only 5 minutes!';
        console.log($sessionStorage.inputEmail)
        $scope.resetPass = function(resCode, newPass){
          var resEmail = $sessionStorage.inputEmail;
          $scope.user ={email:resEmail , code: resCode, password: newPass};
          console.log($scope.user)
          autentificationService.resetPassword($scope.user)
            .then(function(){
              vm.showStartMessage = false;
              vm.showErrorMessage = false;
              vm.successMessage = true;
              $scope.successMessage = 'Your password has been reset'
            })
            .catch(function(response){
              vm.showErrorMessage = true;
              vm.successMessage = false;
              vm.showStartMessage = false;
              if(!resCode || !newPass){
                $scope.message = 'You have to fill all fields'
              }else{
                $scope.message = response.data.message;
              }
            })
        }
    });

    app.directive("validresPassword", function(){
      return{
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){
          ctrl.$parsers.unshift(function(viewValue, $scope){
            var noMatch = viewValue != scope.form.psw.$viewValue
              ctrl.$setValidity('noMatch', !noMatch)
          })
        }
      }
    })
}());
