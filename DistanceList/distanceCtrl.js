(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("distanceCtrl", function ($http, $timeout) {
        var vm = this;

        // distanceService.getSensor1().then(function(data){
        //     vm.sensor1 = data;
        // })
        // distanceService.getSensor2().then(function(data){
        //     vm.sensor2 = data;
        // })
        vm.qs=1;
        vm.quantitySet = function(quantity){
            vm.qs = quantity;
        };

        vm.reload = function(){
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/46/readings")
            .then(function(response) {
                vm.sensor1 = response.data;
            });
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/57/readings")
            .then(function(response) {
                vm.sensor2 = response.data;
            });
            $timeout(function(){
                vm.reload();
            },1000)
        };
        vm.reload();
    });
}());