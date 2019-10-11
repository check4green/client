(function(){
    var app = angular.module("sensorApp");
    app.directive('editGateway', function(){
        return{
            restrict:'E',
            templateUrl: 'Gateways/editGatewayView.html',
            controller: function($scope, $sessionStorage, $localStorage, $timeout, gatewayService){
                $scope.editButton = true;
                $scope.editDisplay = false;
                if($localStorage.email && $localStorage.password){
                    $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                  $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                }
                $scope.startEdit = function(gateway){
                    $scope.editDisplay = true;
                    $scope.deleteDisplay = false;
                    $scope.gatewayDetails = false;
                    $scope.showSensors = false;
                    $scope.editLocationDisplay = false;
                    $scope.editGatewaySuccess = false;
                    $scope.editGatewayerror = false;
                    $scope.sensors = false;
                    $sessionStorage.editGatewayId = gateway.id;
                    document.getElementById('editGatewayButton').style.backgroundColor='#168040';
                    document.getElementById('gatewayDetails').style.backgroundColor = '#3CDB41';
                    document.getElementById('hideDetailsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('sensorsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('deleteGatewayButton').style.backgroundColor='#E88282';
                    document.getElementById('editGatewayLocBtn').style.backgroundColor='#4DA8F2';
                }
                $scope.editGateway = function(name){
                    var gatewayEdit={'name': name};
                    var networkId = $sessionStorage.netId;
                    var gatewayId = $sessionStorage.editGatewayId;
                    gatewayService.updateGateway($scope.encodeduser, networkId, gatewayId, gatewayEdit)
                        .then(function(){
                            $scope.editGatewaySuccess = true;
                            $scope.gateway.name = gatewayEdit.name;
                            $timeout(function(){
                                $scope.detailsButton = true;
                                $scope.editButton = true;
                                $scope.editDisplay = false;
                                $scope.deleteButton = true;
                                $scope.editLocationButton = true;
                                $scope.gatewayDetails = true;
                                $scope.sensors = true;
                            }, 1000)
                        })
                        .catch(function(response){
                            $scope.editGatewayerror = true;
                            $scope.message = response.message;
                        })
                }
                $scope.cancelEdit = function(){
                    document.getElementById('editGatewayButton').style.backgroundColor='#3CDB41';
                    $scope.detailsButton = true;
                    $scope.editButton = true;
                    $scope.editDisplay = false;
                    $scope.deleteButton = true;
                    $scope.editLocationButton = true;
                    $scope.gatewayDetails = true;
                    $scope.sensors = true;
                }
            }
        }
    });
}());