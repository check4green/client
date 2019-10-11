(function(){
    var app = angular.module("sensorApp");
    app.controller("sensorGridCtrl", function ($scope, $rootScope, $sessionStorage, $localStorage, $location, $timeout, $window, autentificationService, sensorModelService, SENSOR_TYPE,hubConnection, $filter){
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        $scope.networkName = $sessionStorage.networkName;
        $scope.sensorData = false;
        $scope.noData = false;
        $scope.searchSensor ='';
        $scope.loading = true;

        //user credentials
        if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
            var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
        }else{
            var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
        }

        //back to networks button
        $scope.back = function(){
            delete $sessionStorage.netId;
            $location.path('sensorsHome/networks');
            $timeout(function(){
                $window.location.reload();
            }, 1000)
        }

        //get sensors from the server
        function getSensors(user, page, pageSize){
            $scope.activeCount = 0;
            $scope.inactiveCount = 0;
            autentificationService.getUserSensors(user, $sessionStorage.netId, page, pageSize)
                .then(function(response){
                    $scope.sensors = response.data;
                    for(var i=0; i<$scope.sensors.length; i++){
                        $scope.sensors[i].productionDate = $scope.sensors[i].productionDate.substr(0, 10)+ " "+ $scope.sensors[i].productionDate.substr(11, 5);
                        if($scope.sensors[i].active == true){
                            $scope.activeCount++;
                        }else{
                            $scope.inactiveCount++;
                        }
                    }
                    $scope.loading=false;
                    if($scope.sensors.length == 0){
                        $scope.noData = true;
                        $scope.noSensors = true;
                        $scope.sensorData = false;
                    }else{
                        $scope.noData = false;
                        $scope.noSensors = false;
                        $scope.sensorData = true;
                    }
                })
                .catch(function(){
                    $scope.loading = false
                    $scope.noData = true;
                    $scope.sensorData = false;
                    $scope.message = 'An error ocurred. Please try again later.'
                })
        }
        autentificationService.getAllSensors(encodeduser, $sessionStorage.netId)
            .then(function(data){
                vm.allSensors = data;
                $scope.totalSensors = data;
                vm.currentPage = 1;
                vm.sensPerPage = 50;
                $scope.loading = true;

                //details button
                vm.expandSelected = function(sensor){
                    $scope.sensors.forEach(function(val){
                        val.expanded=false;
                        $scope.editLocation = true;
                    })
                    sensor.expanded=true;
        
                };
                $scope.showDetails = function(sensor){
                    $scope.sensor = sensor;
                    $sessionStorage.sensorId = sensor.id;
                    $scope.detailsData = true;
        
                };
                $scope.hideDetails = function(){
                    $scope.detailsData = false;
                    hubConnection.disconnectFromHub();
                    if($sessionStorage.activeSens == true){
                        getSensors( encodeduser, vm.currentPage, vm.sensPerPage);
                    }
                }

                //paging
                vm.setPage = function(){
                    getSensors(encodeduser, 1, data);
                }
                $scope.$watch('currentPage', vm.setPage);
                $scope.gridSize ='';

                //searching
                var searchMatch = function (haystack, needle) {
                    if (!needle) {
                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')($scope.sensors, function (item) {
                        if (searchMatch(item.name, $scope.filterSearch))
                            return true;
                        return false;
                    });
                    $scope.sensors = $scope.filteredItems;
                    vm.currentPage = 1;
                    vm.allSensors = $scope.sensors.length;
                    if($scope.filterSearch == ""){
                        vm.allSensors = data;
                        getSensors(encodeduser, 1, data);
                    }
                };

                //filters
                $scope.showActiveSensors = function(value)
                {
                    if(value == true)
                    {
                        $sessionStorage.activeSens = true;
                        autentificationService.getUserSensors(encodeduser, $sessionStorage.netId,vm.currentPage, vm.allSensors)
                            .then(function(response)
                            {
                                $scope.actSensors = response.data;
                                $scope.loading = false;
                                $scope.noSensorsData = false;
                                $scope.sensorData = true;
                                $scope.actsens = [];
                                for(var i=0; i<$scope.actSensors.length; i++)
                                {
                                    if($scope.actSensors[i].active == true)
                                    {
                                        $scope.actsens.push($scope.actSensors[i]);
                                    }
                                }
                                vm.sensPerPage = $scope.actsens.length;
                                vm.allSensors = $scope.actsens.length;
                                $scope.sensors = $scope.actsens;
                                $scope.active = true;
                            })
                            .catch(function(response)
                            {
                                $scope.noSensorsData = true;
                                $scope.loading = false;
                                $scope.sensorData = false;
                            })
                    }
                    else
                    {
                        $sessionStorage.activeSens = false;
                        vm.sensPerPage = 50;
                        vm.allSensors = data;
                        getSensors( encodeduser, vm.currentPage, vm.allSensors);
                    }
                }
            });
        
        //measure unit
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

        //last value
        $scope.getLastRead = function(id){
            hubConnection.connectingToHub();
            $scope.noRead = false;
            $scope.detailsData = false;
            $scope.loadingDetails = true;
            sensorModelService.getMeasurements(encodeduser, $sessionStorage.netId, id, 1, 1 )
                .then(measureSuccess)
                .catch(measureError)
            function measureSuccess(measurement){
                $rootScope.lastRead = measurement;
                for(var i=0; i<$rootScope.lastRead.length; i++){
                    $rootScope.lastRead[i].readingDate = $rootScope.lastRead[i].readingDate.substr(0,10)+ " "+$rootScope.lastRead[i].readingDate.substr(11,5)
                }
                if($rootScope.lastRead == 0){
                    $scope.noRead = true;
                    $scope.loadingDetails = false;
                    $scope.detailsData = true;
                } else{
                    $scope.noRead = false;
                    $scope.detailsData = true;
                    $scope.loadingDetails = false;
                }
            }
            function measureError(){
                $scope.noRead = true;
                $scope.loadingDetails = false;
                $scope.detailsData = true;
            }
            $rootScope.lastRead = null;
        
        }   
        
        //out of range errors
        $scope.outOfRangeAllSens = function(name, id, address, sensType){
            $sessionStorage.name = name;
            $sessionStorage.sensorId = id
            $sessionStorage.sensorAddress = address;
            if(sensType == 1){
                $scope.outOfRangePositiveError = 401;
                $scope.outOfRangeNegativeError = -1;
            } else if(sensType == 2){
                $scope.outOfRangePositiveError = 101;
                $scope.outOfRangeNegativeError = -51;
            }else if(sensType == 3){
                $scope.outOfRangePositiveError = 101;
                $scope.outOfRangeNegativeError = -50;
            }
            else if(sensType == 5){
                $scope.outOfRangePositiveError = 101;
                $scope.outOfRangeNegativeError = -1;
            }
            else if(sensType == 7){
                $scope.outOfRangePositiveError = 101;
                $scope.outOfRangeNegativeError = -1;
            }
            if(sensType == 6){
                $scope.vibrations =true;
            } else{
                $scope.vibrations = false;
            }
        }
        $scope.getSensor = function(id){
            autentificationService.getSensorById(encodeduser, $sessionStorage.netId, id)
                .then(function(response){
                    var sens = response.data;
                    $sessionStorage.name = sens.name;
                    $sessionStorage.uplInt = sens.uploadInterval;
                    var lat = sens.latitude;
                    var long = sens.longitude;
                    $sessionStorage.location = {lat: lat, lng: long};
                })
            
        }
    });
}());