var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/deleteSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $timeout, $localStorage, $sessionStorage){
            $scope.deleteButton = true;
            $scope.deleteDisplay = false;
            $scope.startDelete = function(){
                $scope.deleteDisplay = true;
                $scope.deleteButton = false;
                $scope.detailsDisplay = false;
                $scope.editButton = false;
                $scope.editLocation = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
            }
            if($localStorage.email && $localStorage.password){
                $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            var timer;
            $scope.deleteSensor = function(gatewayAddress, clientAddress){
                sensorModelService.deleteSensors(gatewayAddress, clientAddress, $scope.encodedData);
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
            };
        }
    }
});
