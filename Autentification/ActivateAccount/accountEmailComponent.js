(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.component('accountEmail', {
        templateUrl: 'Autentification/ActivateAccount/accountEmailView.html',
        controller: 'accountEmailCtrl',
        controllerAs: 'vm'
    });
}());