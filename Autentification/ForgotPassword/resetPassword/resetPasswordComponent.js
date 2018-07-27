(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('resetPassword', {
        templateUrl: 'Autentification/ForgotPassword/resetPassword/resetPasswordView.html',
        controller: 'resetPasswordCtrl',
        controllerAs: 'vm'
    });
}());