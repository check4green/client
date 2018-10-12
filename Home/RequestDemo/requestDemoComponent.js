(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('request', {
        templateUrl: 'Home/RequestDemo/requestDemoView.html',
        controller: 'requestCtrl',
        controllerAs: 'vm'
    });
}());