(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('sensorsHome', {
        templateUrl: 'sensorsHome/sensorsHomeView.html',
        controller: 'sensorsHomeCtrl',
        controllerAs: 'vm'
    });
}());