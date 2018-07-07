(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('airQuality', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());