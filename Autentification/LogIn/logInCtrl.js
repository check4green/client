(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("logInCtrl", function ($scope, autentificationService, $localStorage, $sessionStorage, $location) {
        var vm = this;
        var value = true;
        $scope.remeberAccount = function(value, email, password){
           if(value == true){
             $localStorage.email = email;
             $localStorage.password = password;
             console.log("Checked!")
           } else{
             $sessionStorage.email = email;
             $sessionStorage.password = password;
           }
     }
        $scope.login = function(email, password){
          $scope.loading = true;
          $scope.encodeduser = btoa(email +':'+ password)
          autentificationService.logIn($scope.encodeduser)
              .then(function(response){
                  $scope.loading = false;
                  $location.path('/sensorsHome');
                  $sessionStorage.email = email;
                  $sessionStorage.password = password;
              })
              .catch(function(response){
                $scope.loading = false;
                vm.showLogInError = true;
                $scope.message = response.data.message;
              })

        }
});
}())
