var app = angular.module("sensorApp");
app.directive('registerSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/registerSensorDirectiveView.html',
        controller: function($scope, SENSOR_TYPE, distanceService){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.startRegister = function(){
            $scope.sensorData = false;
                if($scope.registerDisplay == false){
                    $scope.registerDisplay = true;
                    $scope.registerButton = false;
                } 
        };

        $scope.sensorRegister = function(registerName, registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress, sensors){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.sensorData = true;
            var sensorPost = {'sensorTypeId':SENSOR_TYPE.ID, 'name':registerName, 'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gatewayAddress':registerGatewayAddress,'clientAddress':registerClientAddress, userId: "1" }
            distanceService.insertSensors(sensorPost);
            sensors.unshift(sensorPost);
            // $scope.registerProductionDate ='';
            // $scope.registerUploadInterval = '';
            // $scope.registerBatchSize = '';
            // $scope.registerGatewayAddress = '';
            // $scope.registerClientAddress = '';
        };
        $scope.cancelRegisterSensor = function(){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.sensorData = true;
            // $scope.registerProductionDate ='';
            // $scope.registerUploadInterval = '';
            // $scope.registerBatchSize = '';
            // $scope.registerGatewayAddress = '';
            // $scope.registerClientAddress = '';
        };
        }
    }
});