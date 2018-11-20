(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('vibration', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());