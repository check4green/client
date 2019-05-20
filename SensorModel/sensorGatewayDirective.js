(function(){
    var app = angular.module("sensorApp");
    app.directive("sensorGateway", function(){
        return {
            restrict: 'E',
            templateUrl: 'SensorModel/sensorGatewayView.html',
            controller: function($scope, sensorModelService, $sessionStorage, $localStorage){
                $scope.loadingGateways = true;
                $scope.gatewayButton = true;
                $scope.showGateways = false;
                if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
                    var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
                }else{
                    var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
                }
                $scope.showGate = function(id){
                    $scope.showGateways = true;
                    $scope.gatewayButton = false;
                    $scope.detailsDisplay = false;
                    $scope.editButton = false;
                    $scope.deleteButton = false;
                    $scope.editLocationButton = false;
                    sensorModelService.getGateway(encodeduser, $sessionStorage.netId, id)
                        .then(function(response){
                            $scope.gateway = response.data;
                            $scope.loadingGateways = false;
                            if($scope.gateway.length == 0){
                                $scope.noGateway = true;
                            }else{
                                $scope.noGateway = false;
                            }
                        });
                    }
                $scope.cancel = function(){
                    $scope.editButton = true;
                    $scope.deleteButton = true;
                    $scope.editLocationButton = true;
                    $scope.detailsDisplay = true;
                    $scope.gatewayButton = true;
                    $scope.gatewayDetails = true;
                    $scope.showGateways = false;
                }
            }
        }
    });
}());