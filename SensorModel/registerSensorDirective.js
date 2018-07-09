var app = angular.module("sensorApp");
app.directive('registerSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'SensorModel/registerSensorDirectiveView.html',
        controller: function($scope, SENSOR_TYPE, sensorModelService, $timeout, $window){
            var vm = this;
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.sensorRegisterError = false;
            $scope.sensorRegisterSuccess = false;
            $scope.startRegister = function(){
                $scope.sensorData = false;
                if($scope.registerDisplay == false){
                    $scope.registerDisplay = true;
                    $scope.registerButton = false;
                    $scope.noSensorsData = false;
                } 
        };

        $scope.sensorRegister = function(registerName, registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress, sensors){
            var sensorPost = {'sensorTypeId':SENSOR_TYPE.ID, 'name':registerName, 'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gatewayAddress':registerGatewayAddress,'clientAddress':registerClientAddress, userId: "1" }
            sensorModelService.insertSensors(sensorPost)
            .then(function(){
                $scope.sensorRegisterError = false; 
                $scope.sensorRegisterSuccess = true;
            })
            .catch(function(response){
                $scope.message = response.data.message; 
                $scope.sensorRegisterError = true; 
                $scope.sensorRegisterSuccess = false;
            });
            // $scope.registerProductionDate ='';
            // $scope.registerUploadInterval = '';
            // $scope.registerBatchSize = '';
            // $scope.registerGatewayAddress = '';
            // $scope.registerClientAddress = '';
        };
        
        $scope.cancelRegisterSensor = function(){
            $window.location.reload();
            $timeout(function(){
                $scope.sensorRegisterError = false;
                $scope.sensorRegisterSuccess = false;
                $scope.registerButton = true;
                $scope.sensorData = true;
                $scope.registerDisplay = false;
                $scope.noSensorsData = true;
            },300);
            // $scope.registerProductionDate ='';
            // $scope.registerUploadInterval = '';
            // $scope.registerBatchSize = '';
            // $scope.registerGatewayAddress = '';
            // $scope.registerClientAddress = '';
        };
        }
    }
});