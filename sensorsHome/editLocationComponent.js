(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('editLocation', {
        templateUrl: 'sensorsHome/editLocationView.html',
        controller: 'editLocationCtrl',
        controllerAs: 'vm'
    });
}());