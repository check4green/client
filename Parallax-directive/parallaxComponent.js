(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('index', {
        templateUrl: 'Parallax-directive/parallaxIndex.html',
        controller: 'indexCtrl',
        controllerAs: 'vm'
    });
}());