(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("logInCtrl", function ($scope, autentificationService, $localStorage, $location) {
        var vm = this;
        $scope.login = function(email, password){
          $scope.encodeduser = btoa(email +':'+ password)
          autentificationService.logIn($scope.encodeduser)
              .then(function(response){
                  $location.path('/sensorsHome');
                  $localStorage.email = email;
                  $localStorage.password = password;
              })
              .catch(function(response){
                  $scope.message = response.data.message;
              })

        }
});
}())
