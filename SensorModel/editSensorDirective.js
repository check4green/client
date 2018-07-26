var app = angular.module("sensorApp");
app.directive('editSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/editSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $localStorage, $sessionStorage){
            $scope.editButton = true;
            $scope.editDisplay = false;
            $scope.sensorEditError = false;
            $scope.sensorEditSuccess = false;
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
            if ($localStorage.email && $localStorage.password){
              $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            $scope.sensorEdit = function(editName, editUploadInterval, editBatchSize, gatewayAddress, clientAddress, sensorId){
                var sensorPut = {'name':editName, 'uploadInterval':editUploadInterval, 'batchSize':editBatchSize}
                sensorModelService.updateSensors(sensorPut, gatewayAddress, clientAddress, $scope.encodedData)
                .then(function(){
                    $scope.sensorEditError = false;
                    $scope.sensorEditSuccess = true;
                    $scope.sensor.uploadInterval=editUploadInterval;
                    $scope.sensor.batchSize=editBatchSize;
                    $scope.sensor.name = editName;
                })
                .catch(function(response){
                    $scope.message = response.data.message;
                    $scope.sensorEditError = true;
                    $scope.sensorEditSuccess = false;
                });
                // $scope.editDisplay = false;
                // $scope.editButton = true;
                // $scope.detailsDisplay = true;
                // $scope.deleteButton = true;
                // $scope.measurementsButton = true;
                // $scope.chartButton = true;
                // $scope.editUploadInterval = '';
                // $scope.editBatchSize = '';
                // $scope.editName = '';
            };
            $scope.cancelEditSensor = function(){
                $scope.editButton = true;
                $scope.editDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
                $scope.sensorEditError = false;
                $scope.sensorEditSuccess = false;
                // $scope.editUploadInterval = '';
                // $scope.editBatchSize = '';
                // $scope.editName = '';
            };
        }
    }
});
