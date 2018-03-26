(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('chart', {
        templateUrl: 'Chart1/IndexChart.html',
        controller: 'chartCtrl',
        controllerAs: 'vm',
        bindings: {
            sensorId: '<'
        }
    });
}());