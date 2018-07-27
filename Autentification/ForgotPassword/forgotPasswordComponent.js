(function(){
    'use strict';
    var app = angular.module('sensorApp');

    app.component('forgotPassword', {
        templateUrl: 'Autentification/ForgotPassword/forgotPasswordView.html',
        controller: 'forgotPasswordCtrl',
        controllerAs: 'vm'
    });
}());
