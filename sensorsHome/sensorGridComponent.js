(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('gridSensors', {
        templateUrl: 'sensorsHome/sensorGridView.html',
        controller: 'sensorGridCtrl',
        controllerAs: 'vm'
    });
}());