(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "$timeout",  "sensorModelService","$http", "$window", function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, $timeout, sensorModelService, $http, $window) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        console.log(SENSOR_TYPE);
        $scope.sensorData = true;
        vm.expandSelected = function(sensor){
            $scope.sensors.forEach(function(val){
                val.expanded=false;
                $scope.editLocation = true;

            })
            sensor.expanded=true;
        };
        $scope.sensorData = false;
        $scope.noData = false;
        $scope.home = false;
        $sessionStorage.home = $scope.home;
        $scope.searchSensor ='';
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
          $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        $scope.sensPerPage = 50;
        sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
            .then(allSensors);
        function allSensors(data){
            $scope.allSensors = data;
            $scope.currentPage = 1;
            vm.setPage = function(){
                sensorModelService.getSensors(1, $scope.allSensors, $scope.encodeduser)
                    .then(function(response){
                        $scope.sensors = response.data;
                        $scope.loading=false;
                    })
            }
            $scope.$watch('currentPage', vm.setPage);
            $scope.loading = true;
            $scope.sensorData = false;
            $scope.noSensorData = false;
            $scope.setPageSize = function(modelSize){
                if(modelSize){
                    $scope.sensPerPage = modelSize;
                }
            }
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
            sensorModelService.getSensors($scope.currentPage, $scope.allSensors, $scope.encodeduser)
                .then(function(response){
                    $scope.sensors = response.data;
                    $scope.loading = false;
                    $scope.noSensorsData = false;
                    $scope.sensorData = true;
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
        $scope.vibrationSens = function(){
            if(SENSOR_TYPE.ID == 37){
                $scope.vibrations = true;
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
