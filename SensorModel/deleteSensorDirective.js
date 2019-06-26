(function(){
var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/deleteSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $timeout, $localStorage, $sessionStorage){
            $scope.deleteButton = true;
            $scope.deleteDisplay = false;
            $scope.startDelete = function(sensor){
                $scope.sensors.forEach(function(val){
                    val.deleteDisplay = false;
                });
                
                sensor.deleteDisplay = true;
                $scope.gatewayButton = false;
                $scope.deleteDisplay = true;
                $scope.deleteButton = false;
                $scope.detailsDisplay = false;
                $scope.editButton = false;
                $scope.editLocation = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
            }
            if($localStorage.email && $localStorage.password){
                var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            if($sessionStorage.cards == true){
                $scope.id = $sessionStorage.sensorId;

                
            }
            var timer;
            $scope.deleteSensor = function(id){
                sensorModelService.deleteSensors(encodedData, $sessionStorage.netId, id);
                timer = $timeout(function(){
                    $window.location.reload();
                },300);
            };
            $timeout.cancel(timer);
            $scope.cancelDeleteSensor = function(){
                $scope.deleteDisplay = false;
                $scope.deleteButton = true;
                $scope.detailsDisplay = true;
                $scope.editLocation = true;
                $scope.editButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
                $scope.gatewayButton = true;
                if($sessionStorage.cards == true){
                    $scope.cards = true;
                    $scope.grid = false;
                    
                } else{
                    $scope.cards = false;
                    $scope.grid = true;
                }
            };
        }
    }
});
}());
