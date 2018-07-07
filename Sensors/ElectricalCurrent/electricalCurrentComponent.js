(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('electricalCurrent', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());