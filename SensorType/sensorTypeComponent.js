(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('type', {
        templateUrl: 'SensorType/sensorTypeView.html',
        controller: 'typeCtrl',
        controllerAs: 'vm'
    });
}());