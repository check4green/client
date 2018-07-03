(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('temperature', {
        templateUrl: 'DistanceList/DistanceView.html',
        controller: 'distanceCtrl',
        controllerAs: 'vm'
    });
}());