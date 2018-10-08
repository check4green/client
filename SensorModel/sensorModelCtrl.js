(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "$timeout",  "sensorModelService","$http", function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, $timeout, sensorModelService, $http) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        console.log(SENSOR_TYPE);
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        sensorModelService.getAllSensors(50, $scope.encodeduser)
                .then(allSensors);
        function allSensors(data){
            $scope.allSensors = data;
            $scope.loading = true;
            sensorModelService.getSensors(1, $scope.allSensors, $scope.encodeduser)
                .then(function(response){
                    $scope.sens = response.data;
                    $scope.addresses = [];
                    for (var i=0; i<$scope.sens.length; i++){
                        $scope.addresses.push($scope.sens[i].gatewayAddress);
                    }
                    for(var i=0; i<$scope.addresses.length -1; i++){
                        if($scope.addresses[i+1] == $scope.addresses[i]){
                            $scope.addresses.splice(i+1, $scope.addresses.length -i);
                        }
                    }
                    $scope.loading = false;
                })
        }
        $scope.back = function(){
            $scope.sensorData = false;
            $scope.noSensorData = false;
            $scope.buttons = true;
            $sessionStorage.buttons = true;
            $scope.registerNetworkButton = true;
        }
        $sessionStorage.home = false;
        $scope.change = false;

        $scope.filterSens = function(gatewayAddress){
            $sessionStorage.addr = gatewayAddress;
            $scope.sensorData = true;
            $scope.buttons = false;
            $scope.registerNetworkButton = false;
            $scope.registerButton = true;
            $sessionStorage.buttons = false;
            $scope.change = true;
            $scope.cards = false;
            $scope.backButton = true;
            vm.expandSelected = function(sensor){
                vm.sensors.forEach(function(val){
                    val.expanded=false;
                    $scope.editLocation = true;

                })
                sensor.expanded=true;
            };
            $scope.sensorData = false;
            $scope.noData = false;
            $scope.noSensorData = false;
            $scope.searchSensor ='';
            $scope.sensPerPage = 50;
            sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
                .then(allSensors);
            function allSensors(data){
                $scope.allSensors = data;
                $scope.currentPage = 1;
                vm.setPage = function(){
                    sensorModelService.getSensors(1, $scope.allSensors, $scope.encodeduser)
                        .then(function(response){
                            $scope.sens = response.data;
                            $scope.sensors = [];
                            for(var i=0; i< $scope.sens.length; i++){
                                if($scope.sens[i].gatewayAddress == $sessionStorage.addr){
                                    $scope.sensors.push($scope.sens[i]);
                                    $scope.loading = false;
                                    $scope.noSensorsData = false;
                                    $scope.sensorData = true;
                                    $scope.noData = false;
                                } else if($scope.sensors.length == 0){
                                    $scope.noSensorsData = true;
                                    $scope.loading = false;
                                }
                            }
                            vm.sensors = $scope.sensors;
                        })
                }
                $scope.$watch('currentPage', vm.setPage);
                $scope.loading = true;
                $scope.sensorData = false;
                $scope.noSensorData = false;
                $scope.setPageSize = function(modelSize){
                    if(modelSize){
                        $scope.sensPerPage = modelSize;
                        sensorModelService.getSensors($scope.currentPage, $scope.allSensors, $scope.encodeduser)
                            .then(function(response){
                                $scope.sens = response.data;
                                $scope.sensors = [];
                                for(var i=0; i< $scope.sens.length; i++){
                                    if($scope.sens[i].gatewayAddress == $sessionStorage.addr){
                                        $scope.sensors.push($scope.sens[i]);
                                        $scope.loading = false;
                                        $scope.noSensorsData = false;
                                        $scope.sensorData = true;
                                    } else if($scope.sensors.length == 0){
                                        $scope.noSensorsData = true;
                                        $scope.loading = false;
                                    }
                                }
                                vm.sensors = $scope.sensors
                            })
                    }
                }
                $scope.search = function(){
                    $scope.$watch('filterSensors.length', function(newValue, oldValue){
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
                    
                    }, true);
                }
                sensorModelService.getSensors($scope.currentPage, $scope.allSensors, $scope.encodeduser)
                    .then(function(response){
                        $scope.sens = response.data;
                        $scope.sensors = [];
                        for(var i=0; i< $scope.sens.length; i++){
                            if($scope.sens[i].gatewayAddress == $sessionStorage.addr){
                                $scope.sensors.push($scope.sens[i]);
                                $scope.loading = false;
                                $scope.noSensorsData = false;
                                $scope.sensorData = true;
                            } else if($scope.sensors.length == 0){
                                $scope.noSensorsData = true;
                                $scope.loading = false;
                            }
                        }
                        vm.sensors = $scope.sensors;
                    })
                    .catch(function(response){
                        $scope.noSensorsData = true;
                        $scope.loading = false;
                        $scope.sensorData = false;
                    });
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
            $scope.outOfRange = function(sensType){
                if(sensType == 33){
                    $scope.outOfRangeError = 401;
                } else if(sensType == 31){
                    $scope.outOfRangeError = 101;
                }else if(sensType == 34){
                    $scope.outOfRangeError = 101;
                }
            }
            $scope.getLastRead = function(GA, CA){
                $scope.noRead = false;
                $scope.detailsData = false;
                $scope.loadingDetails = true;
                sensorModelService.getMeasurements(GA, CA, '1', '1')
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
                };
                $scope.lastRead = null;
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
            sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
                .then(function(response){
                    $scope.totalSensors = response;
                });
            $scope.changeLayout = function(){
                if($scope.cards == false){
                    $scope.noSensorData = false;
                    $scope.sensorData = false;
                    $scope.buttons = false;
                    $scope.cards = true;
                    $scope.editLocation = false;
                    $sessionStorage.details = true;
                } else{
                    $scope.sensorData = true;
                    $scope.buttons = false;
                    $scope.cards = false;
                    $sessionStorage.details = false;
                }
                
            }
            $scope.details = function(){
                $scope.editLocation = true;
                $scope.cards = false;
                $scope.backButton = false;
                $scope.change = false;
                $scope.cancel = true;
                $scope.registerButton = false;
            }
            $scope.cancelDetails = function(){
                $scope.cancel = false;
                $scope.cards = true;
                $sessionStorage.details = false;
                $scope.backButton = true;
                $scope.change = true;
                $scope.registerButton = true;
                $scope.editLocation = false;
            }
            
            //live view

            //    vm.reload = function(){
            //     $http.get("http://192.168.0.18:32333/api/sensors/46/readings")
            //     .then(function(response) {
            //         vm.sensor1 = response.data;
            //     });
            //     $timeout(function(){
            //         vm.reload();
            //     },1000)
            // };
            // vm.reload();
        }
        if($sessionStorage.buttons == false){
            $scope.buttons = false;
            $scope.sensorData = true;
            $scope.registerNetworkButton = false;
            $scope.filterSens($sessionStorage.addr);
        } else{
            $scope.buttons = true;
            $scope.sensorData = false;
            $scope.registerNetworkButton = true;
        }
    }]);
}());



var app = angular.module('sensorApp');
app.directive('caGaValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.indexOf("0x") != 0) {
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
