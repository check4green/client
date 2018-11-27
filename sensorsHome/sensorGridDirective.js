var app = angular.module("sensorApp");
app.directive('gridSensors', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/sensorGridView.html',
        controller: function ($scope, $sessionStorage, $localStorage, autentificationService, sensorModelService, $timeout, $filter, $window){
            var vm = this;
            if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
              var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
            }else{
              var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
            }
            $scope.home = true;
            if($sessionStorage.home == false ){
              $scope.home = false;
            }else {
                $scope.home = true;
            }
            $scope.expandSelected = function(sensor){
                $scope.userSensors.forEach(function(val){
                    val.expanded=false;
                    $scope.editLocation = true;
                })
                sensor.expanded=true;
            };
            $scope.sensorHomeData = false;
            $scope.noData = false;
            $scope.searchSensor ='';
            autentificationService.getAllSensors(encodeduser)
                .then(function(data){
                    $scope.allSensors = data;
                    $scope.totalSensors = data;
                    $scope.currentPage = 1;
                    $scope.sensPerPage = 50;
                    $scope.loading=true;
                    vm.setPage = function(){
                        autentificationService.getUserSensors(encodeduser,  1, $scope.allSensors)
                            .then(function(response){
                                $scope.userSensors = response.data;
                                $scope.loading=false;
                                $scope.sensorHomeData = true;
                            })
                    }
                    $scope.$watch('currentPage', vm.setPage);
                    $scope.gridSize ='';
                    $scope.setPageSize = function(gridSize){
                        if(gridSize){
                            $scope.sensPerPage = gridSize;
                            autentificationService.getUserSensors(encodeduser,  $scope.currentPage, $scope.allSensors)
                                .then(function(response){
                                    $scope.userSensors = response.data;
                                    $scope.loading=false;
                                    $scope.sensorHomeData = true;
                                })
                        }
                    }
                    autentificationService.getUserSensors(encodeduser,  $scope.currentPage, $scope.allSensors)
                        .then(function(response){
                            $scope.userSensors = response.data;
                            $scope.loading=false;
                            $scope.sensorHomeData = true;
                        })
                        .catch(function(response){
                            $scope.loading = false
                            $scope.noData = true;
                            $scope.sensorHomeData = false;
                            $scope.message = 'No data'
                        })
                    $scope.search = function(){
                        $scope.$watchCollection('filterSensors.length', function(newValue, oldValue){
                            if(newValue == data){
                                $scope.allSensors = data;
                                $scope.sensPerPage = 50;
                                return;
                                
                            }
                            if(oldValue == newValue){
                                $scope.currentPage = 1; 
                                var filterSensors = document.getElementById('filteredSens');
                                $scope.allSensors = filterSensors.innerHTML;
                                $scope.sensPerPage = filterSensors.innerHTML;
                            }
                            
                        });
                    }
                })
                $scope.vibrationSens = function(id){
                    if(id == 37){
                        $scope.vibrations = true;
                    }else{
                        $scope.vibrations = false;
                    }
                }
            $scope.measureUnit = function(sensTypeID){
                sensorModelService.getMeasureId(sensTypeID)
                     .then(idSuccess)
                 function idSuccess(data){
                    $scope.id= data.measureId;
                    sensorModelService.getUnitOfMeasure($scope.id)
                        .then(unitOfMeasureSuccess)
                    function unitOfMeasureSuccess(data){
                        $scope.unitOfMeasure = data.unitOfMeasure;
                    }
                }
            }
            $scope.getLastRead = function(GA, CA){
                $scope.noRead = false;
                $scope.detailsData = false;
                $scope.loadingDetails = true;
                sensorModelService.getMeasurements(GA, CA, '1', '1', $scope.encodeduser)
                    .then(measureSuccess)
                    .catch(measureError)
                function measureSuccess(measurements){
                            $scope.lastRead = measurements;
                            $scope.noRead = false;
                            $scope.detailsData = true;
                            $scope.loadingDetails = false;
                        }
                function measureError(measurements){
                          $scope.noRead = true;
                          $scope.loadingDetails = false;
                          $scope.detailsData = true;
                }
                $scope.lastRead = null;
            }      
            $scope.outOfRange = function(sensType){
                if(sensType == 33){
                    $scope.outOfRangeError = 401;
                } else if(sensType == 31){
                    $scope.outOfRangeError = 101;
                }else if(sensType == 34){
                    $scope.outOfRangeError = 101;
                }
                if(sensType == 37){
                    $scope.vibrations =true;
                }
            }
            $scope.startEditLocation = function(gatewayAddress, clientAddress, name, uploadInterval, batchSize, lat, long){
                $sessionStorage.home = false;
                $sessionStorage.gatewayAddress = gatewayAddress;
                $sessionStorage.clientAddress = clientAddress;
                $sessionStorage.name = name;
                $sessionStorage.uplInt = uploadInterval;
                $sessionStorage.batchSize = batchSize;
                $sessionStorage.location = {lat: lat, lng: long};
            }
        }
    }
});