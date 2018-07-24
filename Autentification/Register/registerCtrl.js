
   var app = angular.module("sensorApp");
   app.controller("registerCtrl", function ($scope, $location, $localStorage, autentificationService) {
        var vm = this;
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
        vm.showRegisterError = false;
        $scope.register = function(registerFirstName, registerLastName, registerEmail, registerPassword, registerPassword2, registerCompany, registerCountry, registerPhone){
          if (!registerCountry){
            $scope.user ={
              firstName:registerFirstName ,
              lastName:registerLastName ,
              email:registerEmail ,
              password:registerPassword ,
              companyName:registerCompany ,
              country: 'Romania' ,
              phoneNumber:'+40'+registerPhone
             }
             document.getElementById('inputPhone').value = '+40';
           }
           else{
              $scope.user = {
                  firstName:registerFirstName ,
                  lastName:registerLastName ,
                  email:registerEmail ,
                  password:registerPassword ,
                  companyName:registerCompany ,
                  country:registerCountry.name ,
                  phoneNumber:registerCountry.dialCode+registerPhone
                }
         }
          console.log('User: ', $scope.user)
          autentificationService.register($scope.user)
            .then(function(){
              $location.path('/sensorsHome');
              $localStorage.email = $scope.user.email;
              $localStorage.password = $scope.user.password;
            })
            .catch(function(response){
              vm.showRegisterError = true;
              $scope.error = response.data.message;
            })
        }

    })
    .directive("validPassword", function(){
      return{
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){
          ctrl.$parsers.unshift(function(viewValue, $scope){
            var noMatch = viewValue != scope.regForm.pass.$viewValue
              ctrl.$setValidity('noMatch', !noMatch)
          })
        }
      }
    })
    .directive('nameValid', function(){
      return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl){
          function myValid(value){
            if ((value.indexOf("-") == 0) || (value.indexOf('--') >-1)) {
              mCtrl.$setValidity('charE', false);
            } else{
              mCtrl.$setValidity('charE', true);
            }
            return value;
          }
          mCtrl.$parsers.push(myValid);
        }
      };
    })
    .directive('phoneValid', function(){
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl){
          function valid(value){
            if ((value.indexOf('++') >-1)){
              ctrl.$setValidity('charE', false);
            } else{
              ctrl.$setValidity('charE', true);
            }
            return value;
          }
          ctrl.$parsers.push(valid);
        }
      }
    })
