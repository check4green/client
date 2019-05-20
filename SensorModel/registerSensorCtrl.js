(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("registerSensorCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "sensorModelService", "$window", "$timeout",
        function registerSensorCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService, $window, $timeout) {
            var vm = this;
            vm.titleGrid = SENSOR_TYPE.TITLE;
            $scope.registerButton = true;
            $scope.sensorRegisterError = false;
            $scope.sensorRegisterSuccess = false;
            $scope.sensorData = false;
            $scope.registerDisplay = true;
            $sessionStorage.register = true;
            $scope.registerButton = false;
            $scope.noSensorsData = false;
            $scope.sensorData = false;
            $scope.backButton = false;
            $scope.change = false;
            $scope.cards =false;
            
            if (SENSOR_TYPE.ID == 6){
                $scope.vibrations = true;
            }
            if($localStorage.email && $localStorage.password){
                var encodeduser = btoa($localStorage.email + ':' + $localStorage.password);
            }else{
                var encodeduser = btoa($sessionStorage.email + ':' + $sessionStorage.password);
            }
            $scope.sensorRegister = function(registerName, registerDays, registerHours, registerMinutes, registerClientAddress, sensors){
               
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
                if (SENSOR_TYPE.ID == 6){
                    $scope.uploadInt = 60;
                }
                if($sessionStorage.lat == null && $sessionStorage.lng == null){
                    var lat = 0;
                    var lng = 0;
                } else{
                    var lat = $sessionStorage.lat;
                    var lng = $sessionStorage.lng;
                }
                var sensorPost = {
                              'name':registerName,
                              'productionDate':$scope.maxDate,
                              'uploadInterval':$scope.uploadInt,
                              'address':registerClientAddress,
                              'latitude': lat,
                              'longitude': lng,
                              'sensorTypeId':SENSOR_TYPE.ID,
                               userId: "1" }
                sensorModelService.insertSensors( encodeduser, $sessionStorage.netId, sensorPost)
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
                
            var timer;
            $scope.cancelRegisterSensor = function(){
                $window.history.back();
                $scope.sensorRegisterError = false;
                    $scope.sensorRegisterSuccess = false;
                    $scope.registerButton = true;
                    $scope.sensorData = true;
                    $scope.registerDisplay = false;
                    $sessionStorage.register = false;
                    $scope.noSensorsData = true;
                    $scope.backButton = true;
                    $scope.change = true;
                timer = $timeout(function(){
                    $window.location.reload();
                },300);
                $timeout.cancel(timer)
                // $scope.registerProductionDate ='';
                // $scope.registerUploadInterval = '';
                // $scope.registerBatchSize = '';
                // $scope.registerGatewayAddress = '';
                // $scope.registerClientAddress = '';
            };
        }]);

}());