(function(){
    var app = angular.module("sensorApp");
    app.directive('gatewaySensors', function(){
        return{
            restrict: 'E',
            templateUrl: 'Gateways/gatewaySensorsView.html',
            controller: function($scope, gatewayService, $localStorage, $sessionStorage){
                if($localStorage.email && $localStorage.password){
                    var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                    var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
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
                    gatewayService.gatewaySensors(encodeduser, $sessionStorage.netId, $sessionStorage.gatewayEditId)
                        .then(function(response){
                            $scope.gatewaySensors = response.data;
                            for(var i=0; i<$scope.gatewaySensors.length; i++){
                                if($scope.gatewaySensors[i].lastReadingDate){
                                    $scope.gatewaySensors[i].lastReadingDate = $scope.gatewaySensors[i].lastReadingDate.substr(0,10)+ " " +$scope.gatewaySensors[i].lastReadingDate.substr(11,5);
                                }
                            }
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