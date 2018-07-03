(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('measurement', {
        templateUrl: 'Measurements/measurementsView.html',
        controller: 'MeasurementsCtrl',
        controllerAs: 'vm'
    });
}());