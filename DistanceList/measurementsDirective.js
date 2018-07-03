var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/measurementsDirectiveView.html',
        controller: function($scope, distanceService){
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
                $scope.page = 1;
                $scope.backr = false;
                vm.pageSize = 10;
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    vm.pageSize = pageSize;
                    distanceService.getFinalPageReadings(gatewayAddress, clientAddress)
                        .then(function(response){
                            $scope.totalReadings = response;
                            $scope.finalPag =Math.ceil($scope.totalReadings / vm.pageSize)-1 ;
                            console.log('lastPage: ', $scope.finalPag);
                        distanceService.getMeasurements(gatewayAddress, clientAddress, $scope.page, vm.pageSize)
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
                distanceService.getMeasurements(gatewayAddress, clientAddress, $scope.page, vm.pageSize)
                                    .then(function(measurements){
                                        $scope.measurementSensors = measurements;
                                        $scope.loadingMeasurements = false;
                                        $scope.noDataMeasurements = false;
                                        $scope.dataMeasurements = true;
                                        distanceService.getPageFinal(gatewayAddress, clientAddress)
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
                distanceService.getSensorByAddress(gatewayAddress, clientAddress)
                    .then(success) 
                        function success(data){
                            $scope.address = data;
                    }
                distanceService.getFinalPageReadings(gatewayAddress, clientAddress)
                    .then(function(response){
                        $scope.totalReadings = response;
           })
        //pagination for readings
         $scope.page = 1;
       if($scope.page == 1){
           $scope.backr = false;
       }else {
           $scope.backr = true;
       }
       $scope.nextr = true;
       $scope.paginationReadings = function(pag){
           $scope.backr = true;
           if (pag == false){
               $scope.page = $scope.page -1;
           }
           if(pag == true){
               $scope.page = $scope.page+1;
           }
           if($scope.page<1){
               $scope.page = 1;
           }
           if($scope.page == 1){
                $scope.backr = false;
            }else {
                $scope.backr = true;
            }
         if ($scope.page == $scope.finalPag){
             $scope.nextr = false;
         }else{
             $scope.nextr = true;
         }
           console.log('lastPageRaadings :', $scope.lastPageReadings);
           if ($scope.page == $scope.lastPageReadings-1){
                        $scope.nextr= false;
            }
           
            console.log('page', $scope.page)
            distanceService.getMeasurements($scope.gatewayAddress, $scope.clientAddress, $scope.page, vm.pageSize)
                .then(measureSuccess)
            function measureSuccess(measurements){
                    $scope.measurementSensors = measurements;
                }
       }
            };
        }
    }
});