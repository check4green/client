(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("distanceCtrl",["$timeout", "distanceService","$http", function distanceCtrl( $timeout, distanceService, $http) {
        var vm = this;
        vm.collapsedRegister = false;
        vm.collapsedEdit = false;
        vm.collapsedSensors = true;
        vm.collapsedMeasurements = true;
        vm.collapseRegister = function(){
            if(vm.collapsedRegister == false){
                vm.collapsedRegister = true;
                return;
            }
            vm.collapsedRegister = false;
        };
        vm.collapseEdit = function(){
            if(vm.collapsedEdit == false){
                vm.collapsedEdit = true;
                return;
            }
            vm.collapsedEdit = false;
        }
        vm.sensorRegister = function(registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress){
            var sensorPost = {'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gateWayAddress':registerGatewayAddress,'clientAddress':registerClientAddress, 'sensorTypeId':"33"}
            distanceService.insertSensors(sensorPost);
        };
        vm.sensorEdit = function(editProductionDate, editUploadInterval, editBatchSize, sensorId, editGatewayAddress, editClientAddress){
            var sensorPut = {'productionDate':editProductionDate, 'uploadInterval':editUploadInterval, 'batchSize':editBatchSize, 'sensorTypeId':"33", id:sensorId, 'gateWayAddress':editGatewayAddress, 'clientAddress':editClientAddress, userId:"1"}
            distanceService.updateSensors(sensorPut, sensorId);
        };
        vm.pag=0;
        vm.pagination = function(pg){
            
            if(pg==false){
                vm.pag = vm.pag-1;
            }
            if(pg==true){
                vm.pag = vm.pag+1;
            }
            if(vm.pag<0){
                vm.pag = 0;
            }
           
            console.log(vm.pag);
            distanceService.getSensors(vm.pag)
            .then(function(response){
                var totalCount = response.data.length;
                if(totalCount==0){
                    vm.pag = vm.pag-1;
                    return;
                }
                vm.sensors = response.data;
                
            })
            vm.currentPag=vm.pag;
        }
       
        $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/33/sensors?page=0&pageSize=30")
         .then(function(response) {
            vm.sensors = response.data;
         });
        vm.measurementSensor = function(sensorId){  
           distanceService.getMeasurements(sensorId)
                .then(measureSuccess)
            function measureSuccess(measurements){
                    vm.measurementSensors =measurements;
                }
            distanceService.getSensorById(sensorId)
                .then(success) 
                  function success(data){
                      vm.sId = data;
                }
        };
       vm.qs=1;
       vm.quantitySet= function(quantity){
           vm.qs= quantity;
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
       
        
    }]);
}());