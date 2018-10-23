(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('pricing', {
        templateUrl: 'textHeader/Pricing/pricingView.html',
        controller: 'pricingCtrl',
        controllerAs: 'vm'
    });
}());