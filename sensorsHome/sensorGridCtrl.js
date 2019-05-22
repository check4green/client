(function(){
var app = angular.module("sensorApp");
app.controller("sensorGridCtrl", function ($scope, $rootScope, $sessionStorage, $localStorage, $location, $timeout, $window, autentificationService, sensorModelService, SENSOR_TYPE,hubConnection, gatewayService, networkService){
    var vm = this;
    vm.titleGrid = SENSOR_TYPE.TITLE;
    if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
        var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
    }else{
        var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
    }
    if($sessionStorage.buttons == true){
        $scope.buttons = true
    }else {
        $scope.buttons = false;
        $scope.backButton = true;
    }
    if($sessionStorage.netName){
        $scope.networkName = $sessionStorage.netName
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
        $location.path('sensorsHome/networks');
        $timeout(function(){
            $window.location.reload();

        }, 100)
    }
    $scope.expandSelected = function(sensor){
        $scope.sensors.forEach(function(val){
            val.expanded=false;
            $scope.editLocation = true;
        })
        sensor.expanded=true;
    };
    $scope.disconnectFromHub = function(){
        hubConnection.disconnectFromHub();
    }
    $scope.sensorHomeData = false;
    $scope.noData = false;
    $scope.change = true;
    $scope.searchSensor ='';
    $scope.loading = true;
    function getSensors(user, page, pageSize){
        $scope.networkName = $sessionStorage.networkName;
        autentificationService.getUserSensors(user, $sessionStorage.netId, page, pageSize)
            .then(function(response){
                $scope.sensors = response.data;
                for(var i=0; i<$scope.sensors.length; i++){
                    $scope.sensors[i].productionDate = $scope.sensors[i].productionDate.substr(0, 10)+ " "+ $scope.sensors[i].productionDate.substr(11, 5)
                }
                $scope.loading=false;
                $scope.sensorHomeData = true;
                if($scope.sensors.length == 0){
                    $scope.noData = true;
                    $scope.noSensors = true;
                    $scope.sensorHomeData = false;
                }else{
                    $scope.noData = false;
                    $scope.noSensors = false;
                    $scope.sensorHomeData = true;
                }
            })
            .catch(function(){
                $scope.loading = false
                $scope.noData = true;
                $scope.sensorHomeData = false;
                $scope.message = 'An error ocurred. Please try again later.'
            })
    }
    autentificationService.getAllSensors(encodeduser, $sessionStorage.netId)
        .then(function(data){
            $scope.allSensors = data;
            $scope.currentPage = 1;
            $scope.sensPerPage = 50;
            $scope.loading=true;
            $scope.activeCount =0;
            $scope.inactiveCount =0;
            autentificationService.getUserSensors(encodeduser, $sessionStorage.netId, 1, data)
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
            vm.setPage = function(){
                getSensors(encodeduser, 1, data);
                
            }
            $scope.$watch('currentPage', vm.setPage);
            $scope.gridSize ='';
            $scope.setPageSize = function(gridSize){
                if(gridSize){
                    $scope.sensPerPage = gridSize;
                    getSensors(encodeduser, 1, $scope.sensPerPage);
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
            $scope.showActiveSens = function(value)
            {
                if(value == true){
                    autentificationService.getUserSensors(encodeduser, $sessionStorage.netId, $scope.currentPage, data)
                        .then(function(response){
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
                            $scope.act = true;
                        
                        })
                        .catch(function(){
                            $scope.noSensorsData = true;
                            $scope.loading = false;
                            $scope.sensorData = false;
                        })
                } else{
                    getSensors(encodeduser,  $scope.currentPage, data);
                }
            }
            
            $scope.showAll = function(value){
                if(value == true){
                    getSensors(encodeduser,  $scope.currentPage, data);
                }
            }
        })

        $scope.getSensor = function( name, id, address){
            $sessionStorage.name = name;
            $sessionStorage.sensorId = id
            $sessionStorage.sensorAddress = address;
        }
        $scope.getNetwork = function(network){
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;

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
            
                $scope.noSensorData = false;
                $scope.sensorData = false;
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
        $scope.refreshFunction = function(){
            $scope.id = $sessionStorage.sensorId;
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
        $scope.outOfRangeAllSens = function(sensType){
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
        $scope.startEditLocation = function( name, uploadInterval, lat, long){
            $sessionStorage.name = name;
            $sessionStorage.uplInt = uploadInterval;
            $sessionStorage.location = {lat: lat, lng: long};
        }
});
}());