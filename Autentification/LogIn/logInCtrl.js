(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("logInCtrl", function ($scope, autentificationService, $localStorage, $location) {
        var vm = this;
        $scope.login = function(email, password){
          $localStorage.email = email;
          $localStorage.password = password;
          $scope.encodeduser = btoa(email +':'+ password)
          autentificationService.logIn($scope.encodeduser)
              .then(function(response){
                  $location.path('/sensorsHome');
              })
              .catch(function(response){
                  $scope.message = response.data.message;
              })

        }
});
}())
