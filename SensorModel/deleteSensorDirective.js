(function(){
var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/deleteSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $timeout, $localStorage, $sessionStorage){
            $scope.deleteDisplay = false;
            $scope.startDelete = function(sensor){
                document.getElementById('deleteButton').style.backgroundColor = '#a63d3d';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#3CDB41';               
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                $scope.sensors.forEach(function(val){
                    val.deleteDisplay = false;
                });
                $scope.editDisplay = false;
                $scope.editLocationDisplay = false;
                $scope.showGateways = false;
                $scope.chartDisplay = false;
                $scope.measurementsDisplay = false; 
                sensor.deleteDisplay = true;
                $scope.gatewayButton = false;
                $scope.deleteDisplay = true;
                $scope.detailsDisplay = false;
            }
            if($localStorage.email && $localStorage.password){
                $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            if($sessionStorage.cards == true){
                $scope.id = $sessionStorage.sensorId;

                
            }
            var timer;
            $scope.deleteSensor = function(id){
                sensorModelService.deleteSensors($scope.encodedData, $sessionStorage.netId, id)
                .then(function(){
                    timer = $timeout(function(){
                        $window.location.reload();
                    },300);
                })
                .catch(function(response){
                    $scope.error = true;
                    $scope.errorMsg = response.message;
                })
                
            };
            $timeout.cancel(timer);
            $scope.cancelDeleteSensor = function(){
                document.getElementById('deleteButton').style.backgroundColor = '#4DA8F2'
                $scope.deleteDisplay = false;
                $scope.detailsDisplay = true;
                $scope.editLocation = true;
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#168040';
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
            };
        }
    }
});
}());
