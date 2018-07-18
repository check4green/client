(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('settings', {
        templateUrl: 'Autentification/Settings/settingsView.html',
        controller: 'settingsCtrl',
        controllerAs: 'vm'
    });
}());