(function(){
var app = angular.module("sensorApp");
app.component('editSensor', {
    templateUrl: "SensorModel/editSensorView.html",
    controller: "editSensorCtrl",
    controllerAs: "vm"
});
app.directive('editDirective', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/editSensorView.html',
        controller: function($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService, $window){
            var vm = this;
            $scope.title = false;
            $scope.editDisplay = false;
            $scope.editButton = true;
            $scope.startEdit = function(){
                if($scope.editDisplay == false){
                    $scope.editDisplay = true;
                    $scope.name = $sessionStorage.name;
                    $scope.measurementsButton = false;
                    $scope.chartButton = false;
                    $scope.sensorEditError = false;
                    $scope.sensorEditSuccess = false;
                    $scope.editButton = false;
                    $scope.detailsDisplay = false;
                    $scope.deleteButton = false;
                    $scope.editLocation = false;
                    $scope.editButton = false;
                }
            }
            if ($localStorage.email && $localStorage.password){
              $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            sensorModelService.getSensorsByAddress($sessionStorage.ga, $sessionStorage.ca, $scope.encodedData)
                        .then(function(sensor){
                                var name = sensor.name;
                                var uploadInterval = sensor.uploadInterval;
                                var latitude = sensor.latitude;
                                var longitude = sensor.longitude;
                                $scope.editSensor = {name, uploadInterval, latitude, longitude};
                                var ga = sensor.gatewayAddress;
                                var ca = sensor.clientAddress;
                            $scope.sensorEdit = function(editName,  editDays, editHours, editMinutes, ga, ca){
                                if (editName){
                                    $scope.editSensor.name = editName
                                } 
                                if(editDays || editHours || editMinutes){
                                    if (editDays == null){
                                        editDays = 0;
                                    }
                                    if (editHours == null){
                                        editHours = 0;
                                    }
                                    if(editMinutes == null){
                                        editMinutes = 0;
                                    }
                                    $scope.editSensor.uploadInterval = (editDays* 1440) + (editHours* 60) + editMinutes;
                                }
                                if(!editName && !editDays && !editHours && !editMinutes){
                                    $scope.editSensor ='';
                                } 
                                sensorModelService.updateSensors($scope.editSensor, sensor.gatewayAddress, sensor.clientAddress, $scope.encodedData)
                                    .then(function(response){
                                        if($scope.editSensor.uploadInterval < sensor.uploadInterval){
                                            $scope.ui = true;
                                            $scope.uploadIntMessage = response.message;
                                        }
                                        $scope.sensorEditError = false;
                                        $scope.sensorEditSuccess = true;
                                        $scope.sensor.uploadInterval=$scope.editSensor.uploadInterval;
                                        $scope.sensor.name = $scope.editSensor.name;
                                        
                                        
                                    })
                                    .catch(function(response){
                                        $scope.message = response.data.message;
                                        if(!editName && !editDays && !editHours && !editMinutes){
                                            $scope.message ='You did not edit any field!';
                                        }
                                        $scope.sensorEditError = true;
                                        $scope.sensorEditSuccess = false;
                                    });
                            };
                        })
            
            $scope.cancelEditSensor = function(){
                    $scope.editButton = true;
                    $scope.editDisplay = false;
                    $scope.detailsDisplay = true;
                    $scope.deleteButton = true;
                    $scope.measurementsButton = true;
                    $scope.editLocation = true;
                    $scope.chartButton = true;
                    $scope.sensorEditError = false;
                    $scope.sensorEditSuccess = false;
                    $scope.cards = false;
                    $scope.grid = true;
                    $scope.backButton = true;
                
            };
        }
    }
});
}());
