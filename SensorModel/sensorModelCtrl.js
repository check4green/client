(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$location","$sessionStorage", "sensorModelService", "$rootScope","hubConnection", "$timeout", "$window","$filter",
    function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $location, $sessionStorage, sensorModelService, $rootScope, hubConnection, $timeout, $window, $filter) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        $scope.outOfRangePositiveError = SENSOR_TYPE.OUT_OF_RANGE_POSITIVE;
        $scope.outOfRangeNegativeError = SENSOR_TYPE.OUT_OF_RANGE_NEGATIVE;
        $scope.networkName = $sessionStorage.networkName;
        $scope.sensorData = false;
        $scope.noData = false;
        $scope.searchSensor ='';
        $scope.loading = true;
        vm.currentPage = 1;
        vm.sensPerPage = 50;

        //back to networks button
        $scope.back = function(){
            delete $sessionStorage.netId;
            $location.path('/sensorsHome/networks');
            $timeout(function(){
                $window.location.reload();
            }, 1000)
        }

        //user credentials
        if($localStorage.email && $localStorage.password){
            var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        

        //get sensors from the server
        function getSens(user, networkId, page, size){
            $scope.activeCount =0;
            $scope.inactiveCount =0;
            sensorModelService.getSensors(user, networkId, page, size)
                .then(function(response){
                    $scope.sensors = response.data;
                    for(var i=0; i<$scope.sensors.length; i++){
                        $scope.sensors[i].productionDate = $scope.sensors[i].productionDate.substr(0,10)+ " " + $scope.sensors[i].productionDate.substr(11,5);
                        if($scope.sensors[i].active == true){
                            $scope.activeCount++;
                        }else{
                            $scope.inactiveCount++;
                        }
                    }
                    $scope.loading = false;
                    if($scope.sensors.length == 0){
                        $scope.noSensorsData = true;
                        $scope.sensorData = false;
                    }
                    else{
                        $scope.noSensorsData = false;
                        $scope.sensorData = true;
                    }
                })
                .catch(function(){
                    $scope.noSensorsData = true;
                    $scope.loading = false;
                    $scope.sensorData = false;
                })
        }
        sensorModelService.getAllSensors(encodeduser, $sessionStorage.netId, vm.sensPerPage, )
            .then(allSensors)
            .catch(function(){
                $scope.noSensorData = true;
            })
        function allSensors(data){
            vm.allSensors = data;
            $scope.totalSensors = data;
            if (data == 0){
                $scope.noSensorsData = true;
                $scope.loading = false;
                $scope.sensorData = false;
            }

            //details buuton
            vm.expandSelected = function(sensor){
                $scope.sensors.forEach(function(val){
                    val.expanded=false;
                    $scope.editLocation = true;
                    $scope.editDisplay = false;
                    $scope.editButton = true;
    
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
                    getSens(encodeduser, $sessionStorage.netId, vm.currentPage, vm.sensPerPage);
                }
            }

            //paging
            vm.setPage = function(){
                getSens( encodeduser, $sessionStorage.netId, 1, data);
                    
            }
            $scope.$watch('vm.currentPage', vm.setPage);

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
                    getSens( encodeduser, $sessionStorage.netId,vm.currentPage, vm.allSensors);
                    

                }
                
                
            };
            
            //filters
            $scope.showActiveSensors = function(value)
            {
                if(value == true)
                {
                    $sessionStorage.activeSens = true;
                    sensorModelService.getSensors( encodeduser, $sessionStorage.netId,vm.currentPage, vm.allSensors)
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
                    getSens( encodeduser, $sessionStorage.netId,vm.currentPage, vm.allSensors);
                }
            }
        }
        $scope.measureUnit = function(sensTypeId){
            sensorModelService.getMeasureId(sensTypeId)
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
        $scope.sensData = function(name, id, sensType){
            $sessionStorage.sensorId = id;
            $sessionStorage.name = name;
            if(sensType == 6){
                $scope.vibrations = true;
            }
        }
        $scope.getLastRead = function(id){
            hubConnection.connectingToHub();
            $scope.noRead = false;
            $scope.detailsData = false;
            sensorModelService.getMeasurements(encodeduser, $sessionStorage.netId, id, 1, 1)
                .then(function(measurement){
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
                })
            $rootScope.lastRead = null;
        }
        $scope.getSensor = function(id){
            sensorModelService.getSensorsById(encodeduser, $sessionStorage.netId, id)
                .then(function(response){
                    var sens = response.data;
                    $sessionStorage.name = sens.name;
                    $sessionStorage.uplInt = sens.uploadInterval;
                    var lat = sens.latitude;
                    var long = sens.longitude;
                    $sessionStorage.location = {lat: lat, lng: long};
                })
            
        }
        
    }]);
    app.directive('nameValidation', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, mCtrl) {
                function myValidation(value) {
                if ((value.indexOf("--") > -1) || (value.indexOf("__") > -1) || (value.indexOf("-_") > -1) || (value.indexOf("_-") > -1) || (value.indexOf("-") == 0) || (value.indexOf("_") == 0) || value.indexOf("-") == (value.length - 1) || value.indexOf("_") == (value.length - 1) || (value.match(/[a-z]/i) > -1)) {
                        mCtrl.$setValidity('charE', false);
                    } else {
                        mCtrl.$setValidity('charE', true);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        };
    });
}());
