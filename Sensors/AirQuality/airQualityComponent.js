(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('airQuality', {
        templateUrl: 'AirQuality/airQualityView.html',
        controller: 'airQualityCtrl',
        controllerAs: 'vm'
    });
}());