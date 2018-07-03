var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope, sensorModelService){
            
        $scope.detailsDisplay = true;
        
        }
    }
});