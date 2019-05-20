(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("sensorModelCtrl",["$scope", 'SENSOR_TYPE', "$localStorage", "$location","$sessionStorage", "sensorModelService", "$rootScope","hubConnection", "networkService",
    function sensorModelCtrl($scope, SENSOR_TYPE, $localStorage, $location, $sessionStorage, sensorModelService, $rootScope, hubConnection, networkService) {
        var vm = this;
        vm.titleGrid = SENSOR_TYPE.TITLE;
        //network buttons
        if($sessionStorage.buttons == true){
            $scope.buttons = true
        }else {
            $scope.buttons = false;
            $scope.backButton = true;
        }
        if($sessionStorage.networkName){
            $scope.networkName = $sessionStorage.networkName;
        }
        $scope.backButton = true;

        $scope.back = function(){
            $sessionStorage.gate = false;
            $scope.sensorData = false;
            $scope.noSensorData = false;
            $scope.buttons = true;
            $scope.registerButton = false;
            $sessionStorage.buttons = true;
            $sessionStorage.cards = false;
            delete $sessionStorage.netId;
            $location.path('/sensorsHome/networks')
        }
        if(!$sessionStorage.netId){
            $scope.noNetworkSelected = true;
        }else{
            $scope.noNetworkSelected = false;
        }
        if($localStorage.email && $localStorage.password){
            var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        vm.expandSelected = function(sensor){
            $scope.sensors.forEach(function(val){
                val.expanded=false;
                $scope.editLocation = true;
                $scope.editDisplay = false;
                $scope.editButton = true;

            })
            sensor.expanded=true;
        };
        $scope.disconnectFromHub = function(){
            hubConnection.disconnectFromHub();

        }
        $scope.sensorData = false;
        $scope.noData = false;
        $sessionStorage.home = false;
        $scope.change = true;
        $scope.searchSensor ='';
        
        $scope.loading = true;
        function getSens(user, networkId, page, size){
            $scope.networkName = $sessionStorage.networkName;
            sensorModelService.getSensors(user, networkId, page, size)
                .then(function(response){
                    $scope.sensors = response.data;
                    for(var i=0; i<$scope.sensors.length; i++){
                        $scope.sensors[i].productionDate = $scope.sensors[i].productionDate.substr(0,10)+ " " + $scope.sensors[i].productionDate.substr(11,5)
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
        
        vm.currentPage = 1;
        vm.sensPerPage = 50;
        sensorModelService.getAllSensors(encodeduser, $sessionStorage.netId, vm.sensPerPage, )
            .then(allSensors)
            .catch(function(){
                $scope.noSensorData = true;
            })
        function allSensors(data){
            vm.allSensors = data;
            $scope.totalSensors = data;
            $scope.activeCount =0;
            $scope.inactiveCount =0;
            sensorModelService.getSensors(encodeduser, $sessionStorage.networkId, 1, data)
                .then(function(response){
                    var actSensors = response.data;
                    for(var i=0; i<response.data.length; i++){
                        if(actSensors[i].active == true){
                            $scope.activeCount++;
                        }else{
                            $scope.inactiveCount++;
                        }
                    }
                })
            if (data == 0){
                $scope.noSensorsData = true;
                $scope.loading = false;
                $scope.sensorData = false;
            }
            vm.setPage = function(){
                getSens( encodeduser, $sessionStorage.netId, 1, data);
                    
            }
            $scope.$watch('vm.currentPage', vm.setPage);
            $scope.loading = true;
            $scope.sensorData = false;
            $scope.noSensorData = false;
            $scope.setPageSize = function(modelSize){
                if(modelSize){
                    vm.sensPerPage = modelSize;
                    getSens( encodeduser, $sessionStorage.netId, 1, vm.sensPerPage)
                }
            }
            $scope.search = function(){
                getSens( encodeduser, $sessionStorage.netId, vm.currentPage, data)
                $scope.$watchCollection('filterSensors.length', function(newValue, oldValue){
                    if(newValue == data){
                        vm.allSensors = data;
                        vm.sensPerPage = 50;
                        return;
                        
                    }
                    if(oldValue == newValue){
                        vm.currentPage = 1; 
                        var filterSensors = document.getElementById('filteredSens');
                        vm.allSensors = filterSensors.innerHTML;
                        vm.sensPerPage = filterSensors.innerHTML;
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
        $scope.outOfRange = function(sensType){
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
        }
        $scope.vibrationSens = function(id){
            if(id == 6){
                $scope.vibrations = true;
            }
        }
        $scope.getLastRead = function(id){
            hubConnection.connectingToHub();
            $scope.noRead = false;
            $scope.detailsData = false;
            $scope.loadingDetails = true;
            sensorModelService.getMeasurements(encodeduser, $sessionStorage.netId, id, 1, 1, )
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
        $scope.editDisplay = false;
        $scope.editButton  = true;
        $scope.getSensor = function(name,id){
            $sessionStorage.sensorId = id;
            $sessionStorage.name = name;
        }
        $scope.startEditLocation = function(name, uploadInterval, lat, long){
            $sessionStorage.home = false;
            $sessionStorage.name = name;
            $sessionStorage.uplInt = uploadInterval;
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
            
        $scope.refreshFunction = function(){
            $scope.id = $sessionStorage.sensorId;
        }

        $scope.details = function(){
            $scope.name = $sessionStorage.name;
            $scope.detailsDisplay = true;
            $scope.detailsData = false;
            $scope.id = $sessionStorage.sensorId;
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
    }]);

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
}());
