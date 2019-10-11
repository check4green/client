(function(){
var app = angular.module("sensorApp");
app.directive('measurements', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/measurementsDirectiveView.html',
        controller: function( $rootScope, $scope, sensorModelService, hubConnection, SENSOR_TYPE, $localStorage, $sessionStorage, $timeout){
            var vm = this;
            $scope.measurementsDisplay = false;
            $scope.startMeasurements = function(){
                document.getElementById('gridButton').style.backgroundColor = '#244E70';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#3CDB41';
                document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';

                $scope.detailsDisplay = false;
                $scope.editLocation = false;
                $scope.gatewayButton = false;
                $scope.editLocationDisplay = false;
                $scope.deleteDisplay = false;
                $scope.showGateways = false;
                $scope.chartDisplay = false;
                $scope.editDisplay = false;
                if($scope.measurementsDisplay == false){
                    $scope.measurementsDisplay = true;
                }
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
                if(SENSOR_TYPE.ID == 6){
                    $scope.vibrations = true;
                }
            sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                .then(function(response){
                    $scope.totalReadings = response;
            })   
                $scope.noDataMeasurements = false;
                $scope.loadingMeasurements = true;
                $scope.dataMeasurements = false;
                $scope.invalidCount = 0;
                $scope.outOfRangeCount = 0;
                $scope.valuesCount =0;
                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, 1, $scope.totalReadings)
                                    .then(function(measurements){
                                        $rootScope.measurementSensors = measurements;
                                        for(var i=0; i< $rootScope.measurementSensors.length; i++){
                                            $rootScope.measurementSensors[i].readingDate = $rootScope.measurementSensors[i].readingDate.substr(0,10)+ " "+$rootScope.measurementSensors[i].readingDate.substr(11,5);
                                            if($rootScope.measurementSensors[i].value == 0){
                                                $scope.invalidCount++;
                                            }else if($rootScope.measurementSensors[i].value >= $scope.outOfRangePositiveError || $rootScope.measurementSensors[i].value <= $scope.outOfRangeNegativeError){
                                                $scope.outOfRangeCount++;

                                            } else{
                                                $scope.valuesCount++;
                                            }
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
                
                $scope.filters = [
                    {
                        Id:2,
                        Name: 'Values',
                        Selected: false
                    },
                    {
                        Id:3,
                        Name: 'Out of range values',
                        Selected: false
                    },
                    {
                        Id:4,
                        Name: 'Invalid values',
                        Selected: false
                    }]
                $scope.filterValues = function(selectedId){
                    var count =0;
                    for(var i=0; i<$scope.filters.length; i++){
                        if($scope.filters[i].Selected == false){
                            count++;
                        }
                        if($scope.filters[i].Id != selectedId){
                            $scope.filters[i].Selected = false;

                        }
                        else if(count !=3){
                            if($scope.filters[i].Name=='Values'){
                                sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                                    .then(function(response){
                                        $scope.totalReadings = response;
                                    
                                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, 1, $scope.totalReadings)
                                    .then(function(data){
                                        var readings = data;
                                        var measurements =[];
                                        for(var i=0; i<readings.length; i++){
                                            if(readings[i].value < $scope.outOfRangePositiveError && readings[i].value > $scope.outOfRangeNegativeError && readings[i].value != 0){
                                                readings[i].readingDate = readings[i].readingDate.substr(0, 10)+ " "+ readings[i].readingDate.substr(11, 5)
                                                measurements.push((readings[i]));
                                            }
                                        }
                                        $rootScope.measurementSensors = measurements;
                                        $scope.size = measurements.length;
                                        $scope.totalReadings = measurements.length;

                                    }) 
                                })
                            } else if($scope.filters[i].Name=='Out of range values'){
                                sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                                    .then(function(response){
                                        $scope.totalReadings = response;
                                    
                                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, 1, $scope.totalReadings)
                                    .then(function(data){
                                        var readings = data;
                                        var measurements =[];
                                        for(var i=0; i<readings.length; i++){
                                            if((readings[i].value >= $scope.outOfRangePositiveError || readings[i].value <= $scope.outOfRangeNegativeError) && readings[i].value != 0){
                                                readings[i].readingDate = readings[i].readingDate.substr(0, 10)+ " "+ readings[i].readingDate.substr(11, 5)
                                                measurements.push((readings[i]));
                                            }
                                        }
                                        $rootScope.measurementSensors = measurements;
                                        $scope.size = measurements.length;
                                        $scope.totalReadings = measurements.length;

                                    })
                                })
                            
                            }else if($scope.filters[i].Name=='Invalid values'){
                                sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                                    .then(function(response){
                                        $scope.totalReadings = response;
                                    
                                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, 1, $scope.totalReadings)
                                    .then(function(data){
                                        var readings = data;
                                        var measurements =[];
                                        for(var i=0; i<readings.length; i++){
                                            if(readings[i].value == 0){
                                                readings[i].readingDate = readings[i].readingDate.substr(0, 10)+ " "+ readings[i].readingDate.substr(11, 5)
                                                measurements.push((readings[i]));
                                            }
                                        }
                                        $rootScope.measurementSensors = measurements;
                                        $scope.size = measurements.length;
                                        $scope.totalReadings = measurements.length;

                                    })
                                })
                            }
                        }
                    }
                    if(count == 3){
                        $scope.size = 10;
                        sensorModelService.getFinalPageReadings(encodedData, $sessionStorage.netId, id)
                            .then(function(response){
                                $scope.totalReadings = response;
                                sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id,  1, $scope.totalReadings)
                                        .then(measureSuccess)
                                        function measureSuccess(measurements){
                                            $rootScope.measurementSensors = measurements;
                                            for(var i=0; i< $rootScope.measurementSensors.length; i++){
                                                $rootScope.measurementSensors[i].readingDate = $rootScope.measurementSensors[i].readingDate.substr(0,10)+ " "+$rootScope.measurementSensors[i].readingDate.substr(11,5);
                                            }
                                        }
                        })
                    }
                }
                
                //pagination for readings
                $scope.setPage = function(){
                    sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, 1, $scope.totalReadings)
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
                    for(var i=0; i<data.length; i++){
                        data[i].readingDate = data[i].readingDate.substr(0,10)+ " "+ data[i].readingDate.substr(11,5);
                    }
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
