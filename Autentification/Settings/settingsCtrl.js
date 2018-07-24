(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("settingsCtrl", function ($scope, autentificationService, $localStorage) {
        var vm = this;
        var encodeduser = btoa($localStorage.email +':' + $localStorage.password);
        autentificationService.getUser(encodeduser)
            .then(function(response){
              $scope.user = response.data;
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
            $scope.user.country = editCountry.name;
          }
          if(editPhone){
            $scope.user.phoneNumber = editPhone;
          }
          $scope.user.password = $localStorage.password;
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
                if(editEmail && editPassword){
                    $localStorage.email = editEmail;
                    $localStorage.password = editPassword;
                }
            })
            .catch(function(response){
              $scope.error = response.data.message;
            })

        }
        $scope.countries = [
          {
            "name": "Argentina",
            "dialCode": "+54"
          },
          {
            "name": "Australia",
            "dialCode": "+61"
          },
          {
            "name": "Austria",
            "dialCode": "+43"
          },
          {
            "name": "Belgium",
            "dialCode": "+32"
          },
          {
            "name": "Brazil",
            "dialCode": "+55"
          },
          {
            "name": "Bulgaria",
            "dialCode": "+359"
          },
          {
            "name": "China",
            "dialCode": "+86"
          },
          {
            "name": "Egypt",
            "dialCode": "+20"
          },
          {
            "name": "Hungary",
            "dialCode": "+36"
          },
          {
            "name": "India",
            "dialCode": "+91"
          },
          {
            "name": "Indonezia",
            "dialCode": "+62"
          },
          {
            "name": "Italy",
            "dialCode": "+39"
          },
          {
            "name": "Mexico",
            "dialCode": "+52"
          },
          {
            "name": "Moldova",
            "dialCode": "+373"
          },
          {
            "name": "Norway",
            "dialCode": "+47"
          },
          {
            "name": "Poland",
            "dialCode": "+48"
          },
          {
            "name": "Portugal",
            "dialCode": "+351"
          },
          {
            "name": "Romania",
            "dialCode": "+40"
          },
          {
            "name": "Russia",
            "dialCode": "+7"
          },
          {
            "name": "Slovakia",
            "dialCode": "+421"
          },
          {
            "name": "Slovenia",
            "dialCode": "+386"
          },
          {
            "name": "South Africa",
            "dialCode": "+27"
          },
          {
            "name": "Spain",
            "dialCode": "+34"
          },
          {
            "name": "Sweden",
            "dialCode": "+46"
          },
          {
            "name": "Switzerland",
            "dialCode": "+41"
          },
          {
            "name": "Turkey",
            "dialCode": "+90"
          },
          {
            "name": "Ukraine",
            "dialCode": "+380"
          },
          {
            "name": "United Arab Emirates",
            "dialCode": "+971"
          },
          {
            "name": "United Kingdom",
            "dialCode": "+44"
          },
          {
            "name": "United States",
            "dialCode": "+1"
          },
          {
            "name": "Uruguay",
            "dialCode": "+598"
          },
        ]
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
    app.directive('phoneValidation', function(){
      return{
        require:'ngModel',
        link: function(scope, elem, attrs, mCtrl){
          function myValid(value){
            if ((value.indexOf("+") != 0)) {
              mCtrl.$setValidity('charE', false);
            } else{
              mCtrl.$setValidity('charE', true);
            }
            return value;
          }
          mCtrl.$parsers.push(myValid);
        }
      }
    })
}());
