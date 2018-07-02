(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('electricalCurrent', {
        templateUrl: '/ElectricalCurrentList/electricalCurrentIndex.html',
        controller: 'electricalCurrentCtrl',
        controllerAs: 'vm'
    });
}());