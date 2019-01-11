(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "sensorModelService", function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
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
        $sessionStorage.home = false;
        $scope.searchSensor ='';
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
          $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        function getSens(page, size, user){
            sensorModelService.getSensors(page, size, user)
                .then(function(response){
                    $scope.sensors = response.data;
                    $scope.loading = false;
                    $scope.noSensorsData = false;
                    $scope.sensorData = true;
                })
                .catch(function(){
                    $scope.noSensorsData = true;
                    $scope.loading = false;
                    $scope.sensorData = false;
                })
        }
        $scope.sensPerPage = 50;
        sensorModelService.getAllSensors($scope.sensPerPage, $scope.encodeduser)
            .then(allSensors);
        function allSensors(data){
            $scope.allSensors = data;
            $scope.totalSensors = data;
            $scope.currentPage = 1;
            vm.setPage = function(){
                getSens(1, $scope.allSensors, $scope.encodeduser)
                    
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
            getSens($scope.currentPage, $scope.allSensors, $scope.encodeduser)
                
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
                $scope.outOfRangePositiveError = 401;
                $scope.outOfRangeNegativeError = -1;
            } else if(sensType == 31){
                $scope.outOfRangePositiveError = 126;
                $scope.outOfRangeNegativeError = -56;
            }else if(sensType == 34){
                $scope.outOfRangePositiveError = 101;
                $scope.outOfRangeNegativeError = -1;
            }
        }
        $scope.vibrationSens = function(id){
            if(id == 37){
                $scope.vibrations = true;
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
