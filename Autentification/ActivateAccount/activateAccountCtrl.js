(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.controller('activateAccountCtrl', function($scope, $location, autentificationService, $sessionStorage){
        var vm  = this;
        vm.showMessage = true;
        vm.message ='Please check your email. The code we sent you is avaible only 5 minutes!'
        $scope.activate = function(activationCode){
            vm.showMessage = false;
            $scope.code ={email: $sessionStorage.accountEmail, code: activationCode}
            autentificationService.activateAccount($scope.code)
                .then(function(response){
                    $location.path('/logIn/register');
                })
                .catch(function(response){
                    vm.showMessage = false;
                    $scope.errorMsg = true;
                    $scope.error = response.data.message;
                })
        }
    });
}());