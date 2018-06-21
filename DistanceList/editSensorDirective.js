var app = angular.module("sensorApp");
app.directive('editSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/editSensorDirectiveView.html',
        controller: function($scope, $http, distanceService){
            $scope.editing = false;
            $scope.startEdit = function(){
                $scope.editing = true;
            }
            $scope.sensorEdit = function(editProductionDate, editUploadInterval, editBatchSize, gatewayAddress, clientAddress, sensorId){
                var sensorPut = {'productionDate':editProductionDate, 'uploadInterval':editUploadInterval, 'batchSize':editBatchSize, 'sensorTypeId':"33", id:sensorId, 'gatewayAddress':gatewayAddress, 'clientAddress':clientAddress, userId:"1"}
                distanceService.updateSensors(sensorPut, gatewayAddress, clientAddress);
                $scope.sensor.gatewayAddress=gatewayAddress;
                $scope.sensor.clientAddress=clientAddress;
                $scope.sensor.productionDate=editProductionDate;
                $scope.sensor.uploadInterval=editUploadInterval;
                $scope.sensor.batchSize=editBatchSize;
            };
            $scope.cancelEditSensor = function(){
                $scope.editing = false;
            };
        }
    }
});