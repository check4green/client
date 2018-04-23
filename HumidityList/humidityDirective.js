var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'HumidityList/humidityDirectiveView.html',
        controller: function($scope, $http){
            $scope.deleting = false;
            $scope.startDelete = function(){
                $scope.deleting = true;
            }
            $scope.deleteSensor = function(sensorId, sensors, sensor){
                var idx = sensors.indexOf(sensor);
                if(idx > -1){
                    sensors.splice(idx, 1);
                }
                // $http.delete("http://swiss-iot.azurewebsites.net/api/sensors/" + sensorId)
            };
            $scope.cancelDeleteSensor = function(){
                $scope.deleting = false;
            };
        }
    }
});