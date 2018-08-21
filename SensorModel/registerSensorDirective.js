var app = angular.module("sensorApp");
app.directive('registerSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/registerSensorDirectiveView.html',
        controller: function($scope, SENSOR_TYPE, sensorModelService, $timeout, $window, $localStorage, $sessionStorage){
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
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email + ':' + $localStorage.password);
        }else{
            $scope.encodeduser = btoa($sessionStorage.email + ':' + $sessionStorage.password);
          }
        $scope.sensorRegister = function(registerName, registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress, sensors){
            var sensorPost = {'sensorTypeId':SENSOR_TYPE.ID, 'name':registerName, 'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gatewayAddress':registerGatewayAddress,'clientAddress':registerClientAddress, userId: "1" }
            console.log(sensorPost);
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
        $scope.today = new Date();
        var day = $scope.today.getDate()+ 2;
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
        console.log($scope.time)
        if (day< 10){
            day = '0'+ day;
        }
        if(month< 10){
            month = '0' + month;
        }
        var minMonth = $scope.today.getMonth()+1;
        var minDay = $scope.today.getDate();
        if(minMonth <10){
            minMonth = '0'+ minMonth;
        }
        if(minDay <10){
            minDay = '0' +minDay;
        }
        $scope.maxDate = year+ '-' + month +'-'+  day+ 'T' +$scope.time;
        document.getElementById('inputProdDate').setAttribute('max', $scope.maxDate);
        $scope.minDate = year +'-' + minMonth+ '-' + minDay+ 'T' +$scope.time;
        document.getElementById('inputProdDate').setAttribute('min', $scope.minDate)
        console.log($scope.minDate)
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
