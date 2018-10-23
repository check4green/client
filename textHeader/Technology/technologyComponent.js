(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('technology', {
        templateUrl: 'textHeader/Technology/technologyView.html',
        controller: 'technologyCtrl',
        controllerAs: 'vm'
    });
}());