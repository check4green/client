(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('humidity', {
        templateUrl: 'HumidityList/humidityView.html',
        controller: 'humidityCtrl',
        controllerAs: 'vm'
    });
}());