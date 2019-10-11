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
                    $scope.editLocationDisplay = false;
                    $scope.editDisplay = false;
                    $scope.loadingSensors = true;
                    $scope.sensors = false;
                    $scope.detailsButton = false;
                    $scope.deleteDisplay = false;

                    $scope.sensors = false;
                    $scope.editButton = false;
                    $scope.deleteButton = false;
                    $scope.editLocationButton = false;
                    $scope.gatewayDetails = false;
                    $scope.showSensors = true;
                    document.getElementById('sensorsButton').style.backgroundColor='#244E70';
                    document.getElementById('gatewayDetails').style.backgroundColor = '#3CDB41';
                    document.getElementById('hideDetailsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('editGatewayButton').style.backgroundColor='#3CDB41';
                    document.getElementById('deleteGatewayButton').style.backgroundColor='#E88282';
                    document.getElementById('editGatewayLocBtn').style.backgroundColor='#4DA8F2';
                    gatewayService.gatewaySensors($scope.encodeduser, $sessionStorage.netId, $sessionStorage.gatewayEditId)
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