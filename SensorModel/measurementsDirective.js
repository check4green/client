(function(){
var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/measurementsDirectiveView.html',
        controller: function( $rootScope, $scope, sensorModelService, hubConnection, SENSOR_TYPE, $localStorage, $sessionStorage, $timeout){
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
            
            $scope.measurementSensor = function(gatewayAddress, clientAddress){
                $scope.clientAddress = clientAddress;
                $scope.gatewayAddress = gatewayAddress;
                $scope.page = 1;
                $scope.size = 10;
                $sessionStorage.pag = 10;
                $scope.pageSize = "";
                if(SENSOR_TYPE.ID == 37){
                    $scope.vibrations = true;
                }
                
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    if (pageSize){
                        $scope.size = pageSize;
                        $sessionStorage.pag = pageSize;
                        sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size, $scope.encodedData)
                            .then(measureSuccess)
                        function measureSuccess(measurements){
                            $rootScope.measurementSensors = measurements;
                        }
                    }
                }
                $scope.noDataMeasurements = false;
                $scope.loadingMeasurements = true;
                $scope.dataMeasurements = false;
                sensorModelService.getMeasurements(gatewayAddress, clientAddress, $scope.page, $scope.size, $scope.encodedData)
                                    .then(function(measurements){
                                        $rootScope.measurementSensors = measurements;
                                        $scope.loadingMeasurements = false;
                                        $scope.noDataMeasurements = false;
                                        $scope.dataMeasurements = true;
                                        })
                                        .catch(function(response){
                                            $scope.loadingMeasurements = false;
                                            $scope.noDataMeasurements = true;
                                            $scope.dataMeasurements = false;
                                        });
                                        $rootScope.measurementSensors = null;
                                        if($rootScope.measurementSensors == null){
                                            $scope.totalReadings = 0;
                                        }
                sensorModelService.getFinalPageReadings(gatewayAddress, clientAddress, $scope.encodedData)
                    .then(function(response){
                        $scope.totalReadings = response;
                })
                //pagination for readings
                $scope.setPage = function(){
                    sensorModelService.getMeasurements($scope.gatewayAddress, $scope.clientAddress, $scope.page, $scope.size, $scope.encodedData)
                        .then(measureSuccess)
                    function measureSuccess(measurements){
                        $rootScope.measurementSensors = measurements;
                    }
                }
                $scope.$watch('page', $scope.setPage);
                $scope.getLastRead = function(GA, CA){
                    $scope.noRead = false;
                    $scope.detailsData = false;
                    $scope.loadingDetails = true;
                    sensorModelService.getMeasurements(GA, CA, '1', '1', $scope.encodeduser)
                        .then(measureSuccess)
                        .catch(measureError)
                    function measureSuccess(measurements){
                                $rootScope.lastRead = measurements;
                                $scope.noRead = false;
                                $scope.detailsData = true;
                                $scope.loadingDetails = false;
                            }
                    function measureError(measurements){
                              $scope.noRead = true;
                              $scope.loadingDetails = false;
                              $scope.detailsData = true;
                            };
                    $rootScope.lastRead = null;
                }
            };

        }
    }
});
app.factory("hubConnection", function($rootScope, sensorModelService, $sessionStorage, $localStorage){
    return {connectingToHub: connectingToHub,
            disconnectFromHub: disconnectFromHub}
    function connectingToHub(){
        
        $.connection.hub.url = "https://swiss-iot.azurewebsites.net/signalr/hubs";
        var address = $sessionStorage.gatewayAdd + '/' + $sessionStorage.clientAdd;
        $.connection.hub.qs = {'address': address};
        $.connection.readingsHub.client.refreshReadings = function(readings){
            if ($localStorage.email && $localStorage.password){
                var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
              }else{
                  var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
              }
            sensorModelService.getMeasurements($sessionStorage.gatewayAdd, $sessionStorage.clientAdd, 1, $sessionStorage.pag, encodedData)
                .then(function(data){
                    $rootScope.measurementSensors = data;
                    $rootScope.lastRead = data;
                })
        }
        $.connection.hub.start()
            .done(function(){
                
               
            })
            .fail(function(){
            })
            
            
    }
    function disconnectFromHub(){
        $.connection.hub.url = "https://swiss-iot.azurewebsites.net/signalr/hubs";
        $.connection.hub.stop();

    }
})
}());
