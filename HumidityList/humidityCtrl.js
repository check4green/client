(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("humidityCtrl", function ($http, $timeout) {
        var vm = this;
        vm.collapsedRegister = true;
        vm.collapsedEdit = true;
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
        vm.deleting = false;
        vm.startDelete = function(){
            vm.deleting = true;
        }
        vm.deleteSensor = function(sensorId, sensors, sensor){
            var idx = sensors.indexOf(sensor);
            if(idx > -1){
                sensors.splice(idx, 1);
            }
            $http.delete("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId)
        };
        vm.cancelDeleteSensor = function(){
            vm.deleting = false;
        };
    });
}());