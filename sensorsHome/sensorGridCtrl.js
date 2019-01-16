var app = angular.module("sensorApp");
app.controller("sensorGridCtrl", function ($scope, $sessionStorage, $localStorage, autentificationService, sensorModelService, SENSOR_TYPE){
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
        $scope.userSensors.forEach(function(val){
            val.expanded=false;
            $scope.editLocation = true;
        })
        sensor.expanded=true;
    };
    $scope.sensorHomeData = false;
    $scope.noData = false;
    $scope.searchSensor ='';
    function getSens(user, page, size){
        autentificationService.getUserSensors(user, page, size)
            .then(function(response){
                $scope.userSensors = response.data;
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
            getSens(encodeduser,  $scope.currentPage, $scope.allSensors)
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
        })
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
                $scope.lastRead = measurement;
                $scope.noRead = false;
                $scope.detailsData = true;
                $scope.loadingDetails = false;
            }
            function measureError(){
                $scope.noRead = true;
                $scope.loadingDetails = false;
                $scope.detailsData = true;
            }
            $scope.lastRead = null;
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