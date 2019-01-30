var app = angular.module("sensorApp");
app.directive('editSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/editSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $localStorage, $sessionStorage){
            $scope.editButton = true;
            $scope.editDisplay = false;
            $sessionStorage.editDisplay = $scope.editDisplay;
            $scope.sensorEditError = false;
            $scope.sensorEditSuccess = false;
            $scope.startEdit = function() {
                $scope.editButton = false;
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.editLocation = false;
                if($scope.cards == true){
                    $scope.cards = false;
                    $scope.backButton = false;
                }
                $scope.measurementsButton = false;
                $scope.chartButton = false;
                if($scope.editDisplay == false){
                    $scope.editDisplay = true;
                    $sessionStorage.editDisplay = $scope.editDisplay;
                    $scope.editButton = false;
                }
            };
            if ($localStorage.email && $localStorage.password){
              $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            $scope.getSensor = function(gatewayAddress, clientAddress){
                sensorModelService.getSensorsByAddress(gatewayAddress, clientAddress, $scope.encodedData)
                        .then(function(sensor){
                                var name = sensor.name;
                                var uploadInterval = sensor.uploadInterval;
                                var latitude = sensor.latitude;
                                var longitude = sensor.longitude;
                                $scope.editSensor = {name, uploadInterval, latitude, longitude};
                            $scope.sensorEdit = function(editName,  editDays, editHours, editMinutes, gatewayAddress, clientAddress){
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
                                        if($scope.sensor){
                                            $scope.sensor.uploadInterval=$scope.editSensor.uploadInterval;
                                            $scope.sensor.name = $scope.editSensor.name;
                                        }
                                        
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
            }
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
                if($sessionStorage.cards == true){
                    $window.location.reload();
                    $timeout(function(){
                        $scope.cards = true;
                        $scope.grid = false;
                        $scope.backButton = true;
                    }, 100)
                } else{
                    $scope.cards = false;
                    $scope.grid = true;
                    $scope.backButton = true;
                }
            };
        }
    }
});
