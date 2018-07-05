(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('airQuality', {
        templateUrl: 'sensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());