(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$sessionStorage", "sensorModelService", 
    function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        $scope.sensorData = true;
        vm.expandSelected = function(sensor){
            $scope.sensors.forEach(function(val){
                val.expanded=false;
                $scope.editLocation = true;
                $scope.editDisplay = false;
                $scope.editButton = true;

            })
            sensor.expanded=true;
        };
        $scope.sensorData = false;
        $scope.noData = false;
        $sessionStorage.home = false;
        $scope.change = true;
        $scope.searchSensor ='';
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
          $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        function getSens(page, size, user){
            $scope.activeCount =0;
            $scope.inactiveCount =0;
            sensorModelService.getSensors(page, size, user)
                .then(function(response){
                    $scope.sensors = response.data;
                    for(var i=0; i<response.data.length; i++){
                        if($scope.sensors[i].active == true){
                            $scope.activeCount++;
                        }else{
                            $scope.inactiveCount++;
                        }
                    }
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
            var expanded = false;
            $scope.showCheckboxes = function()
            {
                var checkboxes = document.getElementById("checkboxes");
                if(!expanded){
                    checkboxes.style.display = "block";
                    expanded = true;
                } else{
                    checkboxes.style.display = "none";
                    expanded = false;
                }
            }
            $scope.showActiveSensors = function(value)
            {
                if(value == true)
                {
                    sensorModelService.getSensors($scope.currentPage, $scope.allSensors, $scope.encodeduser)
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
                            $scope.sensors = $scope.actsens;
                            $scope.active = true;
                            
                        })
                        .catch(function()
                        {
                            $scope.noSensorsData = true;
                            $scope.loading = false;
                            $scope.sensorData = false;
                        })
                }
                else
                {
                    getSens($scope.currentPage, $scope.allSensors, $scope.encodeduser);
                }
            }
            //getSens($scope.currentPage, $scope.allSensors, $scope.encodeduser)
                
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
            else if(sensType == 39){
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
        
        $scope.editDisplay = false;
        
        $scope.editButton  = true;
        $scope.getSensor = function(ga, ca, name){
            $sessionStorage.ga = ga;
            $sessionStorage.ca = ca;
            $sessionStorage.name = name;
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
        if($sessionStorage.cards == true){
            $scope.cards = true;
            $scope.grid = false;
        } 
        else{
            $scope.grid = true;
            $scope.cards = false;
        }
        $scope.changeLayoutCards = function(){
            
                $scope.buttons = false;
                $scope.cards = true;
                $scope.editCards = true;
                $scope.grid = false;
                $sessionStorage.cards = true;
                $scope.editLocation = false;
                $sessionStorage.details = true;
                $sessionStorage.editDisplay = true;
                $sessionStorage.editSensGrid = false;
                $sessionStorage.title = true;
            } 
            $scope.changeLayoutGrid = function(){
                $sessionStorage.editSensGrid = true;
                $sessionStorage.editDisplay = false;
                $scope.sensorData = true;
                $scope.buttons = false;
                $scope.cards = false;
                $scope.editCards = false;
                $scope.grid = true;
                $sessionStorage.details = false;
                $sessionStorage.cards = false;
                $sessionStorage.title = false;
                if($sessionStorage.cancelEdit){
                    $timeout(function(){
                        $window.location.reload();
                    }, 1);
                    $sessionStorage.cancelEdit = false;
                }
            }
            
        

        $scope.details = function(){
            $scope.name = $sessionStorage.name;
            $scope.detailsDisplay = true;
            $scope.detailsData = false;
            $scope.clientAddr = $sessionStorage.ca;
            $scope.gatewayAddr = $sessionStorage.ga;
            $scope.editLoc = true;
            $scope.cards = false;
            $scope.backButton = false;
            $scope.change = false;
            $scope.cancel = true;
            $scope.registerButton = false;
            $scope.refresh = true;
            $scope.detail = true;
            $sessionStorage.detail = true
            $scope.sensName = true;
        }
        $scope.cancelDetails = function(){  
            $scope.detailsDisplay = false;   
            $scope.cancel = false;
            $scope.refresh = false;
            $scope.cards = true;
            $scope.backButton = true;
            $scope.change = true;
            $scope.registerButton = true;
            $scope.editLoc = false;
            $sessionStorage.editLoc = false;
            $scope.detailsData = true;
            $scope.detail = false;
            $sessionStorage.detail = false;
            $scope.sensName = false;
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
