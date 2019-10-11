(function(){
    var app=angular.module("sensorApp");
    app.directive('deleteGateway', function(){
        return{
            restrict: 'E',
            templateUrl: 'Gateways/deleteGatewayView.html',
            controller: function($scope, $sessionStorage, $localStorage, gatewayService, $timeout, $window){
                $scope.deleteDisplay = false;
                if($localStorage.email && $localStorage.password){
                    $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                  $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                }
                $scope.startDelete = function(gateway){
                    $sessionStorage.deleteGatewayId = gateway.id;
                    $scope.deleteDisplay = true;
                    $scope.editLocationDisplay = false;
                    $scope.editDisplay = false;
                    $scope.showSensors = false;
                    $scope.gatewayDetails = false;
                    $scope.sensors = false;
                    document.getElementById('deleteGatewayButton').style.backgroundColor='#a63d3d';
                    document.getElementById('gatewayDetails').style.backgroundColor = '#3CDB41';
                    document.getElementById('hideDetailsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('sensorsButton').style.backgroundColor='#4DA8F2';
                    document.getElementById('editGatewayButton').style.backgroundColor='#3CDB41';
                    document.getElementById('editGatewayLocBtn').style.backgroundColor='#4DA8F2';
                }
                $scope.deleteGateway = function(){
                    var deleteId = $sessionStorage.deleteGatewayId;
                    var networkId = $sessionStorage.netId;
                    gatewayService.deleteGateway($scope.encodeduser, networkId, deleteId)
                        .then(function(){
                            $timeout(function(){
                                $window.location.reload();
                            }, 300)
                        })
                        .catch(function(response){
                            $scope.errorDelete = true;
                            $scope.errorMsg = response.message;
                        })
                }
                $scope.cancelDelete = function(){
                    document.getElementById('deleteGatewayButton').style.backgroundColor='#E88282';
                    $scope.deleteDisplay = false;
                    $scope.gatewayDetails = true;
                    $scope.sensors = true;
                }

            }
        }
    });
}());