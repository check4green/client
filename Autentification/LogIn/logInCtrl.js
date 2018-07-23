(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("logInCtrl", function ($scope, autentificationService, $localStorage) {
        var vm = this;
        $scope.login = function(email, password){
          $localStorage.email = email;
          $localStorage.password = password;
          $scope.encodeduser = btoa(email +':'+ password)
          console.log($scope.encodeduser)
          autentificationService.logIn($scope.encodeduser)
              .then(function(){
                console.log('Success!')
              })
              .catch(function(){
                console.log('Error!')
              })

        }
});
}())
