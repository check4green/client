(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("settingsCtrl", function ($scope, autentificationService, $localStorage) {
        var vm = this;
        var encodeduser = btoa($localStorage.email +':' + $localStorage.password);
        autentificationService.logIn(encodeduser)
            .then(function(response){
              $scope.user = response.data;
              console.log($scope.user)
            })
            vm.showUserName = false;
            vm.showEmailAddress = false;
            vm.showPassword = false;
            vm.showCompanyName = false;
            vm.showCountry = false;
            vm.showPhoneNumber = false;
            vm.collapsUserName = function(){
              if(vm.showUserName == false){
                vm.showUserName = true;
              } else{
                vm.showUserName = false;
              }
            }
            vm.collapsEmailAddress = function(){
              if(vm.showEmailAddress == false){
                vm.showEmailAddress = true;
              }else{
                vm.showEmailAddress = false;
              }
            }
            vm.collapsPassword = function(){
              if(vm.showPassword == false){
                vm.showPassword = true;
              }else{
                vm.showPassword = false;
              }
            }
            vm.collapsCompanyName = function(){
              if(vm.showCompanyName == false){
                vm.showCompanyName = true;
              }else{
                vm.showCompanyName = false;
              }
            }
            vm.collapsCountry = function(){
              if(vm.showCountry == false){
                vm.showCountry = true;
              }else{
                vm.showCountry = false;
              }
            }
            vm.collapsPhoneNumber = function(){
              if(vm.showPhoneNumber == false){
                vm.showPhoneNumber = true;
              }else{
                vm.showPhoneNumber = false;
              }
            }
        $scope.saveChanges = function(editFirstname, editLastname, editEmail, password, editPassword, oldPassword, editCompany, editCountry, editPhone){
          if(editFirstname && editLastname){
            $scope.user.firstName = editFirstname;
            $scope.user.lastName = editLastname;
          }
          if(editEmail && (password == $localStorage.password)){
            $scope.user.email = editEmail;
          }
          if((oldPassword == $localStorage.password) && editPassword){
            $scope.user.password = editPassword;
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
            .then(function(){
              $scope.message = 'Account edited successfully!';
              if(editPassword){
                $localStorage.password = editPassword;
              }
              if (editEmail && (password == $localStorage.password)){
                $localStorage.email = editEmail;
            }
            })
            .catch(function(response){
              $scope.error = response.data.message;
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
