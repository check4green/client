(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('distance', {
        templateUrl: 'sensorModel/sensorModelView.html',
        controller: 'sensorModelCtrl',
        controllerAs: 'vm'
    });
}());