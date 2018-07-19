(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("settingsCtrl", function ($scope) {
        var vm = this;
        $scope.user ={"firstName":"Hajdu", "lastName": "Iosif", "email":"hajdu@yahoo.com", "password":"pass123", "company":"HAJDU SRL", "country": "Romania", "phoneNumber":"0748582643"}
        $scope.saveChanges = function(editFirstname, editLastname, editEmail, password, editPassword, oldPassword, confirmEditPass, editCompany, editCountry, editPhone){
          if(editFirstname && editLastname){
            $scope.user.firstName = editFirstname;
            $scope.user.lastName = editLastname;
          }
          if(editEmail && password){
            $scope.user.email = editEmail;
          }
          if(editPassword && oldPassword && confirmEditPass){
            $scope.user.password = editPassword;
          }
          if(editCompany){
            $scope.user.company = editCompany;
          }
          if(editCountry){
            $scope.user.country = editCountry;
          }
          if(editPhone){
            $scope.user.phoneNumber = editPhone;
          }
          console.log('User Edit: ', $scope.user);
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
