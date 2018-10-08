var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/measurementsDirectiveView.html',
        controller: function($scope, sensorModelService, $localStorage, $location, SENSOR_TYPE, $sessionStorage){
            var vm = this;
            $scope.outOfRangeError = SENSOR_TYPE.OUT_OF_RANGE; 
            $scope.measurementsButton = true;
            $scope.measurementsDisplay = false;
            $scope.startMeasurements = function(){
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.editButton = false;
                $scope.chartButton = false;
                if($sessionStorage.details == true){
                    $scope.editLocation = true;
                }else{
                    $scope.editLocation = false;
                }
                if($scope.measurementsDisplay == false){
                    $scope.measurementsDisplay = true;
                    $scope.measurementsButton = false;
                }
            };
            $scope.cancelMeasurements = function(){
                $scope.measurementsButton = true;
                $scope.editLocation = true;
                $scope.measurementsDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.editButton = true;
                $scope.chartButton = true;
            };

            //readings
            $scope.measurementSensor = function(gatewayAddress, clientAddress){
                $scope.clientAddress = clientAddress;
                $scope.gatewayAddress = gatewayAddress;
                $scope.page = 1;
                $scope.size = 10;
                $scope.pageSize = "";
                
                $scope.noDataMeasurements = false;
                $scope.loadingMeasurements = true;
                $scope.dataMeasurements = false;
                sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress, $scope.size)
                    .then(function(response){
                        $scope.totalReadings = response;
                })
                //pagination for readings
                $scope.setPage = function(){
                    sensorModelService.getMeasurements($scope.gatewayAddress, $scope.clientAddress, $scope.currentPageReadings, $scope.size)
                        .then(function(response){
                            $scope.measurementSensors = response.data;
                        })
                }
                $scope.$watch('currentPageReadings', $scope.setPage);
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    if (pageSize){
                        $scope.size = pageSize;
                        sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress, $scope.size)
                            .then(function(response){
                              $scope.totalReadings = response;
                            })
                        sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size)
                            .then(function (response){
                            $scope.measurementSensors = response.data;
                        })
                    }
                }
                sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size)
                                    .then(function(response){
                                        $scope.measurementSensors = response.data;
                                        $scope.loadingMeasurements = false;
                                        $scope.noDataMeasurements = false;
                                        $scope.dataMeasurements = true;
                                        })
                                        .catch(function(response){
                                            $scope.loadingMeasurements = false;
                                            $scope.noDataMeasurements = true;
                                            $scope.dataMeasurements = false;
                                        });
                                        $scope.measurementSensors = null;
                                        if($scope.measurementSensors == null){
                                            $scope.totalReadings = 0;
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
            };
        }
    }
});
