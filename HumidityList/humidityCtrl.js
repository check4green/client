(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("humidityCtrl", function ($http, $timeout) {
        var vm = this;
        vm.sensorRegister = function(registerProductionDate, registerUploadInterval, registerBatchSize){
            var sensorPost = {'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'sensorTypeId':"33"}
            $http.post("http://swiss-iot.azurewebsites.net/api/sensors", sensorPost);
        };
        vm.sensorEdit = function(editProductionDate, editUploadInterval, editBatchSize, sensorId){
            var sensorPut = {'productionDate':editProductionDate, 'uploadInterval':editUploadInterval, 'batchSize':editBatchSize, 'sensorTypeId':"33", id: sensorId, userId:"1"}
            $http.put("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId, sensorPut);
        };
        vm.reload = function(){
        $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/33/sensors")
            .then(function(response) {
                vm.sensors = response.data;
            });
            $timeout(function(){
                vm.reload();
            },500)
        };
        vm.reload();
        vm.measurementSensor = function(sensorId){  
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId + "/readings")
                .then(function(response) {
                    vm.measurementSensors = response.data;
                });
        };
        vm.deleteSensor = function(sensorId){
            $http.delete("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId)
        };
    });
}());