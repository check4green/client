(function (){
    var app = angular.module("sensorApp");
    app.directive('detailsGateway', function(){
        return {
            restrict: 'E',
            templateUrl: 'Gateways/detailsGatewayView.html',
            controller: function($scope){
                $scope.gatewayDetails = true;
                document.getElementById('gatewayDetails').style.backgroundColor = '#168040';
                document.getElementById('hideDetailsButton').style.backgroundColor='#4DA8F2';
                document.getElementById('sensorsButton').style.backgroundColor='#4DA8F2';
                document.getElementById('editGatewayButton').style.backgroundColor='#3CDB41';
                document.getElementById('deleteGatewayButton').style.backgroundColor='#E88282';
                document.getElementById('editGatewayLocBtn').style.backgroundColor='#4DA8F2';

                $scope.startDetails = function(){
                    document.getElementById('gatewayDetails').style.backgroundColor = '#168040';
                    document.getElementById('hideDetailsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('sensorsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('editGatewayButton').style.backgroundColor='#3CDB41';
                    document.getElementById('deleteGatewayButton').style.backgroundColor='#E88282';
                    document.getElementById('editGatewayLocBtn').style.backgroundColor='#4DA8F2';
                    $scope.gatewayDetails = true;
                    $scope.deleteDisplay = false;
                    $scope.showSensors = false;
                    $scope.editDisplay = false;
                    $scope.editLocationDisplay = false;
                }
    
            }
        }
    });
}());