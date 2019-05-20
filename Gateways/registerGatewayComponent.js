(function(){
    'use strict';
var app = angular.module('sensorApp');
app.component('registerGateway',{
        templateUrl: '/Gateways/registerGatewayView.html',
        controller: 'registerGatewayCtrl',
        controllerAs: 'vm'
    
});
}());