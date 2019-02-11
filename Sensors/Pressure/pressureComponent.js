(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('pressure', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());