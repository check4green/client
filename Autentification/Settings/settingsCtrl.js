(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("settingsCtrl", function ($scope, autentificationService, $localStorage, $sessionStorage) {
          var vm = this;
          if ($localStorage.email && $localStorage.password){
          var encodeduser = btoa($localStorage.email +':' + $localStorage.password);
        }else{
          var encodeduser = btoa($sessionStorage.email +':' + $sessionStorage.password);
        }
          autentificationService.getUser(encodeduser)
            .then(function(response){
              $scope.user = response.data;
              if($localStorage.password){
                $scope.user.password = $localStorage.password;
              }else {
                $scope.user.password = $sessionStorages.password;
              }
              $sessionStorage.user = $scope.user;
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
            vm.showSettingsMessage = false;
            vm.showSettingsError = false;


        $scope.saveChanges = function(editFirstname, editLastname, editEmail, password, editPassword, confirmEditPass, oldPassword, editCompany, editCountry, editPhone){
          if($localStorage.email && $localStorage.password){
            $scope.email = $localStorage.email;
            $scope.password = $localStorage.password;
          }else{
            $scope.email = $sessionStorage.email;
            $scope.password = $sessionStorage.password;
          }
          if(editFirstname && editLastname){
            $scope.user.firstName = editFirstname;
            $scope.user.lastName = editLastname;
          }
          if(editEmail && (password ==$scope.password)){
            $scope.user.email = editEmail;
          }
          if((oldPassword == $scope.password) && editPassword){
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
          if(oldPassword && oldPassword !=$scope.password){
                  $scope.user ='';
            }
          if (password && password !=$scope.password){
                  $scope.user = '';
            }
            if(editPhone && editPhone.indexOf('+') !=0){
              $scope.user ='';
            }
            if((!editFirstname && editLastname) || (editFirstname && !editLastname)){
              $scope.user='';
            }
            if((!editEmail && password) || (editEmail && !password)){
              $scope.user ='';
            }
            if((!oldPassword && editPassword) || (oldPassword && !editPassword)){
              $scope.user='';
            }
            if(!editFirstname && !editLastname && !editPassword && !oldPassword && !editEmail && !editCompany && !editCountry && !editPhone){
              $scope.user ='';
            }
          console.log('User Edit: ', $scope.user);
          var encodedData = btoa($scope.email + ':' + $scope.password);

          autentificationService.settings(encodedData, $scope.user)
            .then(function(){
                vm.showSettingsMessage = true;
                vm.showSettingsError = false;
                $scope.message = 'Account edited successfully!';
                if(editPassword && oldPassword == $scope.password){
                    $scope.password = editPassword;
                }
                if (editEmail && (password ==$scope.password)){
                  if($localStorage.email && $localStorage.password){
                    $localStorage.email = editEmail;
                  }else{
                    $sessionStorage.email = editEmail;
                  }
                }
                if(editEmail && editPassword){
                  if($localStorage.email && $localStorage.password){
                    $localStorage.email = editEmail;
                    $localStorage.password = editPassword
                  }else{
                    $sessionStorage.email = editEmail;
                    $sessionStorage.password = editPassword;
                  }
                }
            })
            .catch(function(response){
              vm.showSettingsMessage = false;
              vm.showSettingsError = true;
              $scope.error = response.data.message;
              $scope.user = $sessionStorage.user;
              if(oldPassword && oldPassword != $scope.password){
                      vm.showSettingsError = true;
                      vm.showSettingsMessage = false;
                      $scope.error = 'The old password is incorect.';
                }
              if (password && password != $scope.password){
                      vm.showSettingsError = true;
                      vm.showSettingsMessage = false;
                      $scope.error = 'The password is incorect.';
                }
                if(editPhone && editPhone.indexOf('+') !=0){
                  vm.showSettingsError = true;
                  vm.showSettingsMessage = false;
                  $scope.error ='You have to enter the country dial code.'
                }

                if((!editFirstname && editLastname) || (editFirstname && !editLastname)){
                  vm.showSettingsError = true;
                  vm.showSettingsMessage = false;
                  $scope.error ='To change your user name you have to fill both fields.'
                }
                if((!editEmail && password) || (editEmail && !password)){
                  vm.showSettingsError = true;
                  vm.showSettingsMessage = false;
                  $scope.error ='To change your email you have to fill both fields.'
                }
                if((!oldPassword && editPassword) || (oldPassword && !editPassword)){
                  vm.showSettingsError = true;
                  vm.showSettingsMessage = false;
                  $scope.error ='To change your password you have to fill all three fields.'
                }
                if(!editFirstname && !editLastname && !editPassword && !editEmail && !oldPassword && !editCompany && !editCountry && !editPhone){
                  vm.showSettingsError = true;
                  vm.showSettingsMessage = false;
                  $scope.error ='To change your account you have to fill some fields.'
                }
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
          }]
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
