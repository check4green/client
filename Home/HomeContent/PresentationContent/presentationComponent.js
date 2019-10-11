(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('presentation', {
        templateUrl: 'Home/HomeContent/PresentationContent/presentationView.html',
        controller: 'presentationCtrl',
        controllerAs: 'vm'
    });
}());