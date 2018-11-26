var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/measurementsDirectiveView.html',
        controller: function($scope, sensorModelService, SENSOR_TYPE, $localStorage, $location, $sessionStorage){
            var vm = this;

            $scope.measurementsButton = true;
            $scope.measurementsDisplay = false;
            $scope.startMeasurements = function(){
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.editButton = false;
                $scope.chartButton = false;
                $scope.editLocation = false;
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
            
            if ($localStorage.email && $localStorage.password){
                $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
              }else{
                  $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
              }
            //readings
            $scope.measurementSensor = function(gatewayAddress, clientAddress){
                $scope.clientAddress = clientAddress;
                $scope.gatewayAddress = gatewayAddress;
                $scope.page = 1;
                $scope.size = 10;
                $scope.pageSize = "";
                if(SENSOR_TYPE.ID == 37){
                    $scope.vibrations = true;
                }
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    if (pageSize){
                        $scope.size = pageSize;
                        sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size, $scope.encodedData)
                            .then(measureSuccess)
                        function measureSuccess(measurements){
                            $scope.measurementSensors = measurements;
                        }
                    }
                }
                $scope.noDataMeasurements = false;
                $scope.loadingMeasurements = true;
                $scope.dataMeasurements = false;
                sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size, $scope.encodedData)
                                    .then(function(measurements){
                                        $scope.measurementSensors = measurements;
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
                sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress, $scope.encodedData)
                    .then(function(response){
                        $scope.totalReadings = response;
                })
                //pagination for readings
                $scope.setPage = function(){
                    sensorModelService.getMeasurements($scope.gatewayAddress, $scope.clientAddress, $scope.currentPage, $scope.size, $scope.encodedData)
                        .then(measureSuccess)
                    function measureSuccess(measurements){
                        $scope.measurementSensors = measurements;
                    }
                }
                $scope.$watch('currentPage', $scope.setPage);
            };
        }
    }
});
