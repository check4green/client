(function(){
    var app = angular.module("sensorApp");
    app.directive('gatewaySensors', function(){
        return{
            restrict: 'E',
            templateUrl: 'Gateways/gatewaySensorsView.html',
            controller: function($scope, gatewayService, $localStorage, $sessionStorage){
                if($localStorage.email && $localStorage.password){
                    $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                  $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                }
                $scope.sensors = true;
                $scope.showSensors = false;
                $scope.showGatewaySensors = function(){
                    $scope.loadingSensors = true;
                    $scope.sensors = false;
                    $scope.detailsButton = false;
                    $scope.sensors = false;
                    $scope.editButton = false;
                    $scope.deleteButton = false;
                    $scope.editLocationButton = false;
                    $scope.gatewayDetails = false;
                    $scope.showSensors = true;
                    gatewayService.gatewaySensors($scope.encodeduser, $sessionStorage.netId, $sessionStorage.gatewayEditId)
                        .then(function(response){
                            $scope.gatewaySensors = response.data;
                            $scope.loadingSensors = false;
                            if($scope.gatewaySensors.length == 0){
                                $scope.noSensors = true;
                            } else{
                                $scope.noSensors = false;
                            }
                        })
                }
                $scope.cancel = function(){
                    $scope.sensors = true;
                    $scope.editButton = true;
                    $scope.deleteButton = true;
                    $scope.editLocationButton = true;
                    $scope.gatewayDetails = true;
                    $scope.showSensors = false;
                }

            }
        }
    })

}())