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
                $scope.gatewayButton = false;

                if($scope.measurementsDisplay == false){
                    $scope.measurementsDisplay = true;
                    $scope.measurementsButton = false;
                }
            };
            $scope.cancelMeasurements = function(){
                $scope.measurementsButton = true;
                $scope.gatewayButton = true;
                $scope.editLocation = true;
                $scope.measurementsDisplay = false;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.editButton = true;
                $scope.chartButton = true;
            };
            
            if ($localStorage.email && $localStorage.password){
                var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
              }else{
                var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
              }
            
            $scope.measurementSensor = function(id){
                $scope.page = 1;
                $scope.size = 10;
                $sessionStorage.pag = 10;
                $scope.pageSize = "";
                if(SENSOR_TYPE.ID == 6){
                    $scope.vibrations = true;
                }
                
                //set the number of readings/ page
                $scope.setPageSize = function(pageSize){
                    if (pageSize){
                        $scope.size = pageSize;
                        $sessionStorage.pag = pageSize;
                        sensorModelService.getMeasurements( encodedData, $sessionStorage.netId, id, $scope.page, $scope.size)
                            .then(measureSuccess)
                        function measureSuccess(measurements){
                            $rootScope.measurementSensors = measurements;
                        }
                    }
                }
                $scope.noDataMeasurements = false;
                $scope.loadingMeasurements = true;
                $scope.dataMeasurements = false;
                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, $scope.page, $scope.size)
                                    .then(function(measurements){
                                        $rootScope.measurementSensors = measurements;
                                        for(var i=0; i< $rootScope.measurementSensors.length; i++){
                                            $rootScope.measurementSensors[i].readingDate = $rootScope.measurementSensors[i].readingDate.substr(0,10)+ " "+$rootScope.measurementSensors[i].readingDate.substr(11,5);
                                        }
                                        $scope.loadingMeasurements = false;
                                        $scope.noDataMeasurements = false;
                                        $scope.dataMeasurements = true;
                                        if(measurements.length == 0){
                                            $scope.loadingMeasurements = false;
                                            $scope.noDataMeasurements = true;
                                            $scope.dataMeasurements = false;
                                        }
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
                sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                    .then(function(response){
                        $scope.totalReadings = response;
                })
                //pagination for readings
                $scope.setPage = function(){
                    sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, $scope.page, $scope.size)
                        .then(measureSuccess)
                    function measureSuccess(measurements){
                        $rootScope.measurementSensors = measurements;
                        for(var i=0; i< $rootScope.measurementSensors.length; i++){
                            $rootScope.measurementSensors[i].readingDate = $rootScope.measurementSensors[i].readingDate.substr(0,10)+ " "+$rootScope.measurementSensors[i].readingDate.substr(11,5);
                        }
                    }
                }
                $scope.$watch('page', $scope.setPage);
            };

        }
    }
});
app.factory("hubConnection", function($rootScope, sensorModelService, $sessionStorage, $localStorage){
    return {
        connectingToHub: connectingToHub,
        disconnectFromHub: disconnectFromHub,
    }
    function connectingToHub(){
        $.connection.hub.url = "https://swiss-iot.azurewebsites.net/signalr/hubs";
        var address = $sessionStorage.sensorAddress;
        $.connection.hub.qs = {'address': address};
        $.connection.readingsHub.client.refreshReadings = function(readings){
            if ($localStorage.email && $localStorage.password){
                var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
              }else{
                  var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
              }
            sensorModelService.getMeasurements( encodedData, $sessionStorage.netId, $sessionStorage.sensorId,  1, $sessionStorage.pag )
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
        $.connection.hub.url = "https:swiss-iot.azurewebsites.net/signalr/hubs";
        $.connection.hub.stop();

    }
})
}());
