(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("distanceCtrl",["$scope", "$localStorage", "$timeout", "distanceService","$http", function distanceCtrl($scope, $localStorage, $timeout, distanceService, $http) {
        var vm = this;
        vm.sensorTypeId = function(sensorTypeId){
            vm.SensorType = sensorTypeId
        }
        $scope.sensorData = true;
        vm.expandSelected = function(sensor){
            vm.sensors.forEach(function(val){
                val.expanded=false;
            })
            sensor.expanded=true;
        };

       //sensors
        distanceService.getFinalPage()
        .then(finalPage);
        function finalPage(data){
           vm.lastPage = data;
            console.log('Last page', vm.lastPage);
            $localStorage.final = vm.lastPage;
           if(vm.pag == vm.lastPage-1){
                vm.next = false;
            }else {
                vm.next = true;
            }
       }
         if($localStorage.page){
                vm.pag = $localStorage.page;
            }else{
                vm.pag = 0;
            }
        if ($localStorage.page){
        if ($localStorage.page == 0){
            vm.back = false;
        }else{
            vm.back = true;
        }
        }else{
            vm.back = false;
        }
        if (vm.pag == $localStorage.final-1){
            vm.next = false;
        }else {
            vm.next = true;
        }
        vm.pagination = function(pg){
           
            if(pg==false){
                vm.pag = vm.pag-1;
            }
            if(pg==true && vm.totalCount != 0){
                vm.pag = vm.pag+1;
                vm.back = true;
            }
            if(vm.pag<0){
                vm.pag = 0;
            }
            if (vm.pag == 0){
                vm.back = false;
            }
            
            if(vm.pag == $localStorage.final-1){
                vm.next = false;
            }else{
                vm.next = true;
            }
            $localStorage.page = vm.pag;
            console.log(vm.pag);
            $scope.loading=true;
            $scope.loadingGray=true;
            distanceService.getSensors(vm.pag)
            .then(function(response){
                 vm.sensors = response.data;
                 $scope.loading = false;
                 $scope.loadingGray = false;
            })
        }
        $scope.loading = true;
        $scope.sensorData = false;
        $scope.noSensorData = false;
        $http.get("http://192.168.0.18:32333/api/sensors?page=" + vm.pag + "&pageSize=30")
        // $http.get("http://swiss-iot.azurewebsites.net/api/sensors?page=" + vm.pag + "&pageSize=30")
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
            distanceService.getMeasurements(GA, CA, '0', '1')
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

        distanceService.getAllSensors()
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
