(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('electricalCurrent', {
        templateUrl: 'DistanceList/distanceView.html',
        controller: 'distanceCtrl',
        controllerAs: 'vm'
    });
}());