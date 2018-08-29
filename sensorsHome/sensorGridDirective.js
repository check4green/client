var app = angular.module("sensorApp");
app.directive('gridSensors', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/sensorGridView.html',
        controller: function ($scope, $sessionStorage, $localStorage, autentificationService, sensorModelService, $filter){
            var vm = this;
            if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
              var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
            }else{
              var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
            }
            
            if($sessionStorage.home == false){
              $scope.home = false;
            }else{
                $scope.home = true;
            }
            $scope.sensorHomeData = true;
            $scope.expandSelected = function(sensor){
                $scope.userSensors.forEach(function(val){
                    val.expanded=false;
                })
                sensor.expanded=true;
            };
            $scope.sensorHomeData = false;
            $scope.noData = false;
            $scope.searchSensor ='';
            autentificationService.getAllSensors(encodeduser)
              .then(function(data){
                $scope.allSensors = data;
              })
            $scope.currentPage = 1;
            $scope.sensPerPage = 50;
            $scope.loading=true;
            vm.setPage = function(){
              autentificationService.getUserSensors(encodeduser,  0, $scope.allSensors)
                 .then(function(response){
                  $scope.userSensors = response.data;
                  $scope.loading=false;
                  $scope.sensorHomeData = true;
                 })
            }
            $scope.$watch('currentPage', vm.setPage);
            $scope.setPageSize = function(pageSize){
              if(pageSize){
              $scope.sensPerPage = pageSize;
              if($localStorage.email && $localStorage.password){
                 encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
              }else{
                  encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
              }
              autentificationService.getUserSensors(encodeduser,  0, $scope.allSensors)
                .then(function(response){
                  $scope.userSensors = response.data;
                  $scope.loading=false;
                  $scope.sensorHomeData = true;
                })
              }
            }
            autentificationService.getUserSensors(encodeduser,  0, $scope.allSensors)
              .then(function(response){
                $scope.userSensors = response.data;
                $scope.loading=false;
                $scope.sensorHomeData = true;
              })
              .catch(function(response){
                $scope.loading = false
                $scope.noData = true;
                $scope.sensorHomeData = false;
                $scope.message = 'No data'
              })
            $scope.$watch('filterSensors', function(newValue, oldValue){
                if(oldValue != newValue){
                    var filterSensors = document.getElementById('filteredSens');
                    $scope.allSens = filterSensors.innerHTML;
                }
            }, true)
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
                }
                $scope.lastRead = null;
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
        }
    }
});