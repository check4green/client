(function(){
var app = angular.module("sensorApp");
app.controller("sensorGridCtrl", function ($scope, $rootScope, $sessionStorage, $localStorage, autentificationService, sensorModelService, SENSOR_TYPE){
    var vm = this;
    vm.titleGrid = SENSOR_TYPE.TITLE;
    if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
        var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
    }else{
        var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
    }
    $scope.home = true;
    if($sessionStorage.home == false ){
        $scope.home = false;
    }
    $scope.expandSelected = function(sensor){
        $scope.sensors.forEach(function(val){
            val.expanded=false;
            $scope.editLocation = true;
        })
        sensor.expanded=true;
    };
    $scope.sensorHomeData = false;
    $scope.noData = false;
    $scope.change = true;
    $scope.searchSensor ='';
    function getSens(user, page, size){
        $scope.activeCount =0;
        $scope.inactiveCount =0;
        autentificationService.getUserSensors(user, page, size)
            .then(function(response){
                $scope.sensors = response.data;
                for(var i=0; i<response.data.length; i++){
                    if($scope.sensors[i].active == true){
                        $scope.activeCount++;
                    }else{
                        $scope.inactiveCount++;
                    }
                }
                $scope.loading=false;
                $scope.sensorHomeData = true;
            })
            .catch(function(){
                $scope.loading = false
                $scope.noData = true;
                $scope.sensorHomeData = false;
                $scope.message = 'No data'
            })
    }
    autentificationService.getAllSensors(encodeduser)
        .then(function(data){
            $scope.allSensors = data;
            $scope.totalSensors = data;
            $scope.currentPage = 1;
            $scope.sensPerPage = 50;
            $scope.loading=true;
            vm.setPage = function(){
                getSens(encodeduser,  1, $scope.allSensors)
            }
            $scope.$watch('currentPage', vm.setPage);
            $scope.gridSize ='';
            $scope.setPageSize = function(gridSize){
                if(gridSize){
                    $scope.sensPerPage = gridSize;
                }
            }
            // getSens(encodeduser,  $scope.currentPage, $scope.allSensors)
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
                    autentificationService.getUserSensors(encodeduser,  $scope.currentPage, $scope.allSensors)
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
                    getSens(encodeduser,  $scope.currentPage, $scope.allSensors);
                }
            }
            
        })
        $scope.getSensor = function(ga, ca, name){
            $sessionStorage.ga = ga;
            $sessionStorage.ca = ca;
            $sessionStorage.name = name;
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
        $scope.getLastRead = function(GA, CA){
            $scope.noRead = false;
            $scope.detailsData = false;
            $scope.loadingDetails = true;
            sensorModelService.getMeasurements(GA, CA, '1', '1', $scope.encodeduser)
                .then(measureSuccess)
                .catch(measureError)
            function measureSuccess(measurement){
                $rootScope.lastRead = measurement;
                $scope.noRead = false;
                $scope.detailsData = true;
                $scope.loadingDetails = false;
            }
            function measureError(){
                $scope.noRead = true;
                $scope.loadingDetails = false;
                $scope.detailsData = true;
            }
            $rootScope.lastRead = null;
        }      
        $scope.outOfRangeAllSens = function(sensType){
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
            if(sensType == 37){
                $scope.vibrations =true;
            } else{
                $scope.vibrations = false;
            }
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
});
}());