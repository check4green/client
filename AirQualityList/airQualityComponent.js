(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('airQuality', {
        templateUrl: 'AirQualityList/airQualityIndex.html',
        controller: 'airQualityCtrl',
        controllerAs: 'vm'
    });
}());