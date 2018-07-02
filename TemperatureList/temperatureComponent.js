(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('temperature', {
        templateUrl: 'TemperatureList/temperatureIndex.html',
        controller: 'temperatureCtrl',
        controllerAs: 'vm'
    });
}());