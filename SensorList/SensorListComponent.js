(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('sensor', {
        templateUrl: 'SensorList/sensorListView.html',
        controller: 'sensorCtrl',
        controllerAs: 'vm'
    });
}());