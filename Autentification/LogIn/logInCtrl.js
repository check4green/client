(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("indexCtrl", function ($location, $scope) {
        var vm = this;
          $scope.username = "name@yahoo.com";
          $scope.password = "pass123";
        $scope.authenticate = function(name, pass){
          if (name == $scope.username && pass == $scope.password){
            $location.path('/distance');
            $scope.nameError = false;
            $scope.passError = false;
          } else{
            if(name != $scope.username){
              $scope.nameError = true;
            }else{
              $scope.nameError = false;
            }
            if(pass != $scope.password){
              $scope.passError = true;
            }else{
              $scope.passError = false;
            }
          }
        }
        $scope.register = function(registerEmail, registerFirstName, registerLastName, registerPassword, registerPhoneNumber, registerCompany, registerCountry, registerAddress ){
          $scope.user = {email: registerEmail, firstName: registerFirstName, lastName: registerLastName, password: registerPassword,
                         phoneNumber: registerPhoneNumber, company: registerCompany, country: registerCountry, address: registerAddress }

        }
});
    app.directive("validPassword", function(){
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl){
          ctrl.$parsers.unshift(function(viewValue, $scope){
            var noMatch = viewValue != scope.registerForm.password.$viewValue
            ctrl.$setValidity('noMatch', !noMatch)
          })
        }
      }
    })
}());
