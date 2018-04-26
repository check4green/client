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
        vm.collapsedRegister = false;
        vm.collapsedEdit = false;
        vm.collapsedSensors = true;
        vm.collapsedMeasurements = true;
        vm.collapseRegister = function(){
            if(vm.collapsedRegister == false){
                vm.collapsedRegister = true;
                return;
            };
            vm.collapsedRegister = false;
        };
        vm.collapseEdit = function(){
            if(vm.collapsedEdit == false){
                vm.collapsedEdit = true;
                return;
            };
            vm.collapsedEdit = false;
        };
        vm.collapseSensors = function(){
            if(vm.collapsedSensors == false){
                vm.collapsedSensors = true;
                return;
            };
            vm.collapsedSensors = false;
        };
        vm.collapseMeasurements = function(){
            if(vm.collapsedMeasurements == false){
                vm.collapsedMeasurements = true;
                return;
            };
            vm.collapsedMeasurements = false;
        };
        vm.sensorRegister = function(registerProductionDate, registerUploadInterval, registerBatchSize){
            var sensorPost = {'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'sensorTypeId':"33"}
            $http.post("http://swiss-iot.azurewebsites.net/api/sensors", sensorPost);
        };
        vm.sensorEdit = function(editProductionDate, editUploadInterval, editBatchSize, sensorId){
            var sensorPut = {'productionDate':editProductionDate, 'uploadInterval':editUploadInterval, 'batchSize':editBatchSize, 'sensorTypeId':"33", id:sensorId, userId:"1"}
            $http.put("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId, sensorPut);
        };
        vm.pag = 0;
        vm.pagination = function(pg){
            if(pg==false){
                vm.pag = vm.pag-1;
            }
            if(pg==true){
                vm.pag = vm.pag+1;
            }
            if(vm.pag<0){
                vm.pag = 0;
            };
            console.log(vm.pag);
            $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/33/sensors?page=" + vm.pag + "&pageSize=30")
                .then(function(response) {
                    vm.sensors = response.data;
                });
        };
        $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/33/sensors?page=0&pageSize=30")
            .then(function(response) {
                vm.sensors = response.data;
            });
        vm.measurementSensor = function(sensorId){  
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId + "/readings")
                .then(function(response) {
                    vm.measurementSensors = response.data;
                });
        };
        vm.qs=1;
        vm.quantitySet = function(quantity){
            vm.qs = quantity;
        };
        vm.reload = function(){
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/65/readings")
            .then(function(response) {
                vm.sensor1 = response.data;
            });
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/91/readings")
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