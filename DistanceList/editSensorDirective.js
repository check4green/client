var app = angular.module("sensorApp");
app.directive('editSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/editSensorDirectiveView.html',
        controller: function($scope, distanceService){
            $scope.editButton = true;
            $scope.editDisplay = false;
            $scope.startEdit = function(){
                $scope.editButton = false;
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
                if($scope.editDisplay == false){
                    $scope.editDisplay = true;
                    $scope.editButton = false;
                }
            };
            $scope.sensorEdit = function(editUploadInterval, editBatchSize, gatewayAddress, clientAddress, sensorId){
                $scope.editDisplay = false;
                $scope.editButton = true;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
                var sensorPut = {'uploadInterval':editUploadInterval, 'batchSize':editBatchSize}
                distanceService.updateSensors(sensorPut, gatewayAddress, clientAddress);
                $scope.sensor.uploadInterval=editUploadInterval;
                $scope.sensor.batchSize=editBatchSize;
                $scope.editUploadInterval = '';
                $scope.editBatchSize = '';
            };
            $scope.cancelEditSensor = function(){
                $scope.editButton = true;
                $scope.editDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
                $scope.editUploadInterval = '';
                $scope.editBatchSize = '';
            };
        }
    }
});