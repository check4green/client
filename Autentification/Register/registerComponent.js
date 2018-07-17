(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('register', {
        templateUrl: 'Autentification/Register/registerView.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
    });
}());