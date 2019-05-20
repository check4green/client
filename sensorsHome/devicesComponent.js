var app = angular.module("sensorApp");
    app.component('devices', {
        templateUrl: 'sensorsHome/devicesView.html',
        controller: 'devicesCtrl',
        controllerAs : 'vm'
    });