(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("editSensorCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "sensorModelService", "$window", "$timeout",
function($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService, $window, $timeout){
            var vm = this;
            $scope.title = true;
            vm.title = SENSOR_TYPE.TITLE;
            
            $scope.editButton = true;
            $scope.name = $sessionStorage.name
            
            if($scope.cards == true){
                $scope.cards = false;
                $scope.backButton = false;
            }
            $scope.editDisplay = true;
            $scope.measurementsButton = false;
            $scope.chartButton = false;
            $scope.gatewayButton = false;
            $scope.sensorEditError = false;
            $scope.sensorEditSuccess = false;
            $scope.editButton = false;
            $scope.detailsDisplay = false;
            $scope.deleteButton = false;
            $scope.editLocation = false;
            
            $scope.editButton = false;
            
            if ($localStorage.email && $localStorage.password){
                var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            sensorModelService.getSensorsById(encodedData, $sessionStorage.netId, $sessionStorage.sensorId)
                        .then(function(sensor){
                                var name = sensor.name;
                                var uploadInterval = sensor.uploadInterval;
                                var latitude = sensor.latitude;
                                var longitude = sensor.longitude;
                                $scope.editSensor = {name, uploadInterval, latitude, longitude};
                                
                            $scope.sensorEdit = function(editName,  editDays, editHours, editMinutes){
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
                                sensorModelService.updateSensors(encodedData , $sessionStorage.netId, $sessionStorage.sensorId, $scope.editSensor)
                                    .then(function(response){
                                        if($scope.editSensor.uploadInterval < sensor.uploadInterval){
                                            $scope.ui = true;
                                            $scope.uploadIntMessage = response.message;
                                        }
                                        $timeout(function(){
                                            
                                            $scope.editButton = true;
                                            $scope.detailsDisplay = true;
                                            $scope.deleteButton = true;
                                            $scope.measurementsButton = true;
                                            $scope.editLocation = true;
                                            $scope.chartButton = true;
                                            $scope.sensorEditError = false;
                                            $scope.sensorEditSuccess = false;
                                            if($sessionStorage.cards == true){
                                                $scope.cards = true;
                                                $scope.grid = false;
                                                $scope.backButton = true;
                                            } else{
                                                $scope.cards = false;
                                                $scope.grid = true;
                                                $scope.backButton = true;
                                            }
                                            $window.history.back();
                                        }, 1000)
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
                    $window.history.back();
                    $scope.editButton = true;
                    $scope.detailsDisplay = true;
                    $scope.deleteButton = true;
                    $scope.measurementsButton = true;
                    $scope.editLocation = true;
                    $scope.chartButton = true;
                    $scope.sensorEditError = false;
                    $scope.sensorEditSuccess = false;
                    $scope.gatewayButton = true;
                    if($sessionStorage.cards == true){
                        $scope.cards = true;
                        $scope.grid = false;
                        $scope.backButton = true;
                    } else{
                        $scope.cards = false;
                        $scope.grid = true;
                        $scope.backButton = true;
                    }
                
            };
        }
   ]);
}());