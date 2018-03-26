(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('dashboard', {
        templateUrl: 'Dashboard/dashboardView.html',
        controller: 'dashboardCtrl',
        controllerAs: 'vm'
    });
}());