(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("settingsCtrl", function ($scope, autentificationService, $localStorage) {
        var vm = this;
        var encodeduser = btoa($localStorage.email +':' + $localStorage.password);//'bmFtZUB5YWhvby5jb206YXBhbWluZXJhbGE=';
        autentificationService.logIn(encodeduser)
            .then(function(response){
              $scope.user = response.data;
              console.log($scope.user)
            })
        $scope.saveChanges = function(editFirstname, editLastname, editEmail, password, editPassword, oldPassword, editCompany, editCountry, editPhone){
          if(editFirstname && editLastname){
            $scope.user.firstName = editFirstname;
            $scope.user.lastName = editLastname;
          }
          if(editEmail && password){
            $scope.user.email = editEmail;
            $localStorage.email = editEmail;
          }
          if(oldPassword && editPassword){
            $scope.user.password = editPassword;
            $localStorage.password = editPassword;
          }
          if(editCompany){
            $scope.user.companyName = editCompany;
          }
          if(editCountry){
            $scope.user.country = editCountry;
          }
          if(editPhone){
            $scope.user.phoneNumber = editPhone;
          }
          if(editEmail && editPassword){
            $localStorage.email = editEmail;
            $localStorage.password = editPassword;
          }
          console.log('User Edit: ', $scope.user);
          var encodedData = btoa($localStorage.email + ':' + $localStorage.password);
          autentificationService.settings(encodedData, $scope.user)
            .catch(function(response){
              $scope.message = response.data.message;
            })
        }
    });
    app.directive("validPass", function(){
      return{
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){
          ctrl.$parsers.unshift(function(viewValue, $scope){
            var noMatch = viewValue != scope.passwordEdit.pass1.$viewValue
              ctrl.$setValidity('noMatch', !noMatch)
          })
        }
      }
    })
}());
