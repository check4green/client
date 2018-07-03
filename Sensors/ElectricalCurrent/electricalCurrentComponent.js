(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('electricalCurrent', {
        templateUrl: 'sensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());