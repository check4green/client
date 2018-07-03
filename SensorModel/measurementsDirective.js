var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return { 
        restrict: 'E',
        templateUrl: 'sensorModel/measurementsDirectiveView.html',
        controller: function($scope, sensorModelService, $localStorage){
            var vm = this;
            $scope.measurementsButton = true;
            $scope.measurementsDisplay = false;
            $scope.startMeasurements = function(){
                $scope.detailsDisplay = false;
                $scope.deleteButton = false;
                $scope.editButton = false;
                $scope.chartButton = false;
                if($scope.measurementsDisplay == false){
                    $scope.measurementsDisplay = true;
                    $scope.measurementsButton = false;
                }
            };
            $scope.cancelMeasurements = function(){
                $scope.measurementsButton = true;
                $scope.measurementsDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.editButton = true;
                $scope.chartButton = true;
                // $scope.pageSize = '';
            };

            //readings
            $scope.measurementSensor = function(gatewayAddress, clientAddress){ 
                $scope.clientAddress = clientAddress;
                $scope.gatewayAddress = gatewayAddress; 
                $scope.page = 0;
                $scope.size = 10;
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    $scope.size = pageSize;
                    sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress)
                        .then(function(response){
                            $scope.totalReadings = response;
                            $scope.numPages =Math.ceil($scope.totalReadings / $scope.size)-1 ;
                            console.log('lastPage: ', $scope.numPages);
                        sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size)
                            .then(measureSuccess)
                            function measureSuccess(measurements){
                                $scope.measurementSensors = measurements;
                                if(measurements==0){
                                    $scope.noDataMeasurements = true;
                                } else {
                                    $scope.noDataMeasurements = false;
                                }
                            }
                        })
                    }
                    $scope.noDataMeasurements = false;
                    $scope.loadingMeasurements = true;
                    $scope.dataMeasurements = false;
                sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, vm.pageSize)
                                    .then(function(measurements){
                                        $scope.measurementSensors = measurements;
                                        $scope.loadingMeasurements = false;
                                        $scope.noDataMeasurements = false;
                                        $scope.dataMeasurements = true;
                                        sensorModelService.getPageFinal(gatewayAddress, clientAddress)
                                            .then(Success)
                                                function Success(data){
                                                    $scope.lastPageReadings= data
                                                }
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
                sensorModelService.getSensorByAddress(gatewayAddress, clientAddress)
                    .then(success) 
                        function success(data){
                            $scope.address = data;
                    }
                sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress)
                    .then(function(response){
                        $scope.totalReadings = response;
           })
        //pagination for readings
        sensorModelService.getPageFinal($scope.gatewayAddress, $scope.clientAddress, $scope.size)
        .then(finalPage);
        function finalPage(data){
           $scope.numPages = data-1;
           console.log('Last Page Readings: ', $scope.numPages)
       }
       if($localStorage.readings){
         $scope.currentPage = $localStorage.readings;
       }else{
       $scope.currentPage = 0;
     }
       $scope.setPage = function(){
            sensorModelService.getMeasurements($scope.gatewayAddress, $scope.clientAddress, $scope.currentPage, $scope.size)
                .then(measureSuccess)
            function measureSuccess(measurements){
                    $scope.measurementSensors = measurements;
                }
          console.log("Current Page Readings: ", $scope.currentPage)
       }
       $scope.$watch('currentPage', $scope.setPage);

            };
        }
    }
});