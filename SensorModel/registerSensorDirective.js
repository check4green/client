var app = angular.module("sensorApp");
app.directive('registerSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/registerSensorDirectiveView.html',
        controller: function($scope, SENSOR_TYPE, sensorModelService, $timeout, $window, $localStorage, $sessionStorage){
            var vm = this;
            $sessionStorage.register = false;
            if($sessionStorage.register == false){
                $scope.registerDisplay = false;
            }
            $scope.registerButton = true;
            $scope.sensorRegisterError = false;
            $scope.sensorRegisterSuccess = false;
            $scope.startRegister = function(){
                $scope.sensorData = false;
                if($scope.registerDisplay == false){
                    $scope.registerDisplay = true;
                    $sessionStorage.register = true;
                    $scope.registerButton = false;
                    $scope.noSensorsData = false;
                    $scope.sensorData = false;

                }
            };
            if($localStorage.email && $localStorage.password){
                $scope.encodeduser = btoa($localStorage.email + ':' + $localStorage.password);
            }else{
                $scope.encodeduser = btoa($sessionStorage.email + ':' + $sessionStorage.password);
            }
            $scope.sensorRegister = function(registerName, registerDays, registerHours, registerMinutes, registerBatchSize, registerGatewayAddress, registerClientAddress, sensors){
               
                if(registerDays == null){
                    registerDays = 0;
                }
                if(registerHours == null){
                    registerHours = 0;
                }
                if(registerMinutes == null){
                    registerMinutes = 0;
                }
                var days = registerDays*1440;
                var hours = registerHours*60;
                var minutes = registerMinutes;
                $scope.uploadInt = days + hours + minutes;
                var sensorPost = {'sensorTypeId':SENSOR_TYPE.ID, 
                              'name':registerName,
                              'productionDate':$scope.maxDate,
                              'uploadInterval':$scope.uploadInt,
                              'batchSize':registerBatchSize,
                              'gatewayAddress':registerGatewayAddress,
                              'clientAddress':registerClientAddress,
                              'latitude': $sessionStorage.lat,
                              'longitude': $sessionStorage.lng,
                               userId: "1" }
                sensorModelService.insertSensors(sensorPost, $scope.encodeduser)
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
            $scope.updateTime = function(){
                $scope.today = new Date();
                var day = $scope.today.getDate();
                var month = $scope.today.getMonth() +1;
                var year = $scope.today.getFullYear();
                var hour = $scope.today.getHours();
                var minutes = $scope.today.getMinutes();
                if(hour< 10){
                     hour = '0' + hour;
                 }
                if(minutes< 10){
                    minutes ='0' + minutes;
                }
                $scope.time = hour +':' + minutes;
                if (day< 10){
                    day = '0'+ day;
                }
                if(month< 10){
                    month = '0' + month;
                }
                $scope.maxDate = year+ '-' + month +'-'+  day + 'T'+ $scope.time;
            }
            var timer;
            $scope.cancelRegisterSensor = function(){
                $window.location.reload();
                timer = $timeout(function(){
                    $scope.sensorRegisterError = false;
                    $scope.sensorRegisterSuccess = false;
                    $scope.registerButton = true;
                    $scope.sensorData = true;
                    $scope.registerDisplay = false;
                    $sessionStorage.register = false;
                    $scope.noSensorsData = true;
                },300);
                $timeout.cancel(timer)
                // $scope.registerProductionDate ='';
                // $scope.registerUploadInterval = '';
                // $scope.registerBatchSize = '';
                // $scope.registerGatewayAddress = '';
                // $scope.registerClientAddress = '';
            };
        }
    }
});
