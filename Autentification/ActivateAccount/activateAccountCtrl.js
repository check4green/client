(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.controller('activateAccountCtrl', function($scope, $location, autentificationService, $sessionStorage){
        var vm  = this;
        vm.showMessage = true;
        vm.message ='Please check your email. The code is avaible only 5 minutes!'
        $scope.activate = function(activationCode){
            vm.showMessage = false;
            $scope.code ={email: $sessionStorage.accountEmail, code: activationCode}
            $location.path('/register');
            // autentificationService.activateAccount($scope.code)
            //     .then(function(response){
                    
            //     })
            //     .catch(function(response){
            //         vm.showMessage = false;
            //         $scope.errorMsg = true;
            //         $scope.error = response.data.message;
            //     })
        }
    });
}());