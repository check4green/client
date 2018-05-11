(function(){
    'use strict';
    var app = angular.module("sensorApp");

    app.component('menu', {
        templateUrl: '/menuList/menuView.html',
        controller: 'menuCtrl',
        controllerAs: 'vm'
    });
}());


 