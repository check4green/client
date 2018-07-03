(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$timeout", "sensorModelService","$http", function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $timeout, sensorModelService, $http) {
        var vm = this;
        console.log(SENSOR_TYPE);
        $scope.sensorData = true;
        vm.expandSelected = function(sensor){
            vm.sensors.forEach(function(val){
                val.expanded=false;
            })
            sensor.expanded=true;
        };

       //sensors
       $scope.sensPerPage = 10;
       sensorModelService.getFinalPage($scope.sensPerPage)
        .then(finalPage);
        function finalPage(data){
           $scope.numPages = data;
           console.log('Last Page: ', $scope.numPages)
       }
       sensorModelService.getAllSensors($scope.sensPerPage)
            .then(allSensors);
        function allSensors(data){
          $scope.allSensors = data;
        }
        if($localStorage.page){
          $scope.currentPage = $localStorage.page;
        }else{
          $scope.currentPage = 1;
        }
        vm.setPage = function(){
          $scope.loading=true;
          sensorModelService.getSensors($scope.currentPage, $scope.sensPerPage)
             .then(function(response){
               vm.sensors = response.data;
               $localStorage.page = $scope.currentPage;
               $scope.loading=false;
               console.log("Current Page: ", $scope.currentPage)

             })
        }
        $scope.$watch('currentPage', vm.setPage);
        $scope.loading = true;
        $scope.sensorData = false;
        $scope.noSensorData = false;
        // $http.get("http://192.168.0.18:32333/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + $scope.currentPage + "&pageSize=" + $scope.sensPerPage)
        $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + $scope.currentPage + "&pageSize=" + $scope.sensPerPage)
         .then(function(response) {
            vm.sensors = response.data;
            $scope.loading = false;
            $scope.noSensorsData = false;
            $scope.sensorData = true;
            $scope.registerSensor = true;
         })
         .catch(function(response){
            $scope.noSensorsData = true;
            $scope.loading = false;
            $scope.sensorData = false;
            $scope.registerSensor = false;
         });
         vm.getLastRead = function(GA, CA){
            $scope.noRead = false;
            $scope.detailsData = false;
            $scope.loadingDetails = true;
            sensorModelService.getMeasurements(GA, CA, '1', '1')
                .then(measureSuccess)
                .catch(measureError)
                    function measureSuccess(measurements){
                        vm.lastRead = measurements;
                        $scope.detailsData = true;
                        $scope.loadingDetails = false;
                        $scope.noRead = false;
                    } 
                    function measureError(measurements){
                        $scope.noRead = true;
                        $scope.loadingDetails = false;
                        $scope.detailsData = true;
                    }
                    vm.lastRead = null;
        };

        sensorModelService.getAllSensors()
            .then(function(response){
                $scope.totalSensors = response;
            });
        
       //live view
       
    //    vm.qs=10;
    //    vm.quantitySet= function(quantity){
    //        vm.qs = quantity;
    //    };
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
                if (value.indexOf("0x") == 0) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

var app = angular.module('sensorApp');
app.directive('nameValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
            if ((value.indexOf("--") > -1) || (value.indexOf("__") > -1) || (value.indexOf("-_") > -1) || (value.indexOf("_-") > -1)) {
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
