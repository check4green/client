(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('products', {
        templateUrl: 'textHeader/Products/productsView.html',
        controller: 'productsCtrl',
        controllerAs: 'vm'
    });
}());