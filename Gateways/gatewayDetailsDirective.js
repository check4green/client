(function (){
    var app = angular.module("sensorApp");
    app.directive('detailsGateway', function(){
        return {
            restrict: 'E',
            templateUrl: 'Gateways/detailsGatewayView.html',
            controller: function($scope){
                $scope.gatewayDetails = true;
            }
        }
    });
}());