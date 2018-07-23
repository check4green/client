(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('contact', {
        templateUrl: 'Autentification/Contact/contactView.html',
        controller: 'contactCtrl',
        controllerAs: 'vm'
    });
}());