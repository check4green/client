(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('temperature', {
        templateUrl: 'sensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());