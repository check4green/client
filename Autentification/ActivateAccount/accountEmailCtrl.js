(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.controller('accountEmailCtrl', function($scope, $location, autentificationService,$sessionStorage){
        var vm  = this;
        $scope.sendCode = function(emailAddress){
            $sessionStorage.accountEmail = emailAddress;
            $scope.email = {email: emailAddress};
            $location.path("accountEmail/activateAccount");
            // autentificationService.getActivationCode($scope.email)
            //     .then(function(response){
                    
            //     })
            //     .catch(function(response){
            //         $scope.errorMsg = true;
            //         $scope.error = response.data.message;
            //     })
        }
    });
}());