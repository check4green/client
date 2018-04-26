(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('distance', {
        templateUrl: 'DistanceList/distanceView.html',
        controller: 'distanceCtrl',
        controllerAs: 'vm'
    });
}());