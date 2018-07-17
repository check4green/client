(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('logIn', {
        templateUrl: 'Autentification/LogIn/logInView.html',
        controller: 'logInCtrl',
        controllerAs: 'vm'
    });
}());