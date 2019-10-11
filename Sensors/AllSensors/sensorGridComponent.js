(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('gridSensors', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorGridCtrl',
        controllerAs: 'vm'
    });
}());