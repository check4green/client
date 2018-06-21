var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/detailsSensorDirectiveView.html',
        controller: function($scope, distanceService){
            
        $scope.detailsDisplay = true;
        
        }
    }
});