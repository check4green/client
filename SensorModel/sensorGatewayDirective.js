(function(){
    var app = angular.module("sensorApp");
    app.directive("sensorGateway", function(){
        return {
            restrict: 'E',
            templateUrl: 'SensorModel/sensorGatewayView.html',
            controller: function($scope, sensorModelService, $sessionStorage, $localStorage){
                $scope.loadingGateways = true;
                $scope.showGateways = false;
                if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
                    var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
                }else{
                    var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
                }
                $scope.showGate = function(id){
                    document.getElementById('gatewaysButton').style.backgroundColor = '#244E70';
                    document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                    document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('details').style.backgroundColor = '#3CDB41';
                    document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                    document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';

                    $scope.showGateways = true;
                    $scope.detailsDisplay = false;
                    $scope.deleteDisplay = false;
                    $scope.editLocationDisplay = false;
                    $scope.measurementsDisplay = false;
                    $scope.chartDisplay = false;
                    $scope.editDisplay = false;
                    sensorModelService.getGateway(encodeduser, $sessionStorage.netId, id)
                        .then(function(response){
                            $scope.gateway = response.data;
                            $scope.loadingGateways = false;
                            for(var i=0; i<$scope.gateway.length; i++){
                                $scope.gateway[i].lastSensorDate = $scope.gateway[i].lastSensorDate.substr(0, 10)+ " "+ $scope.gateway[i].lastSensorDate.substr(11, 5)
                            }
                            if($scope.gateway.length == 0){
                                $scope.noGateway = true;
                            }else{
                                $scope.noGateway = false;
                            }
                        });
                    }
            }
        }
    });
}());