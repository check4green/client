(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('aboutUs', {
        templateUrl: 'textHeader/AboutUs/aboutUsView.html',
        controller: 'aboutUsCtrl',
        controllerAs: 'vm'
    });
}());