(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('distance', {
        templateUrl: 'SensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());