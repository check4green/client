(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.component('activateAccount', {
        templateUrl: 'Autentification/ActivateAccount/activateAccountView.html',
        controller: 'activateAccountCtrl',
        controllerAs: 'vm'
    });
}());