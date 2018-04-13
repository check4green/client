(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('distance', {
        templateUrl: 'DistanceList/distanceIntex.html',
        controller: 'distanceCtrl',
        controllerAs: 'vm'
    });
}());