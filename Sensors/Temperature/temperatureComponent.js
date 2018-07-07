(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('temperature', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());