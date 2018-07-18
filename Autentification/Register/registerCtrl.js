
   var app = angular.module("sensorApp");
   app.controller("registerCtrl", function ($scope, $location) {
        var vm = this;
        $scope.register = function(registerFirstName, registerLastName, registerEmail, registerPassword, registerPassword2, registerCompany, registerCountry, registerPhone, registerType){
          $scope.user ={firstName:registerFirstName , lastName:registerLastName , email:registerEmail , paswword:registerPassword , company:registerCompany , country:registerCountry , phone:registerPhone , sensorType:registerType }
          $location.path('/sensorsHome')
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
            if ((value.indexOf("-") ==0 ) || (value.indexOf('--') >-1)) {
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
