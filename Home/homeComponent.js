(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('home', {
        templateUrl: 'Home/homeView.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
    });
}());