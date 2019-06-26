(function(){
    var app=angular.module("sensorApp");
    app.directive('deleteGateway', function(){
        return{
            restrict: 'E',
            templateUrl: 'Gateways/deleteGatewayView.html',
            controller: function($scope, $sessionStorage, $localStorage, gatewayService, $timeout, $window){
                $scope.deleteDisplay = false;
                $scope.deleteButton = true;
                if($localStorage.email && $localStorage.password){
                    var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                    var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                }
                $scope.startDelete = function(gateway){
                    $scope.gateways.forEach(function(val){
                        val.deleteDisplay = false;
                    });
                    gateway.deleteDisplay = true;
                    $sessionStorage.deleteGatewayId = gateway.id;
                    $scope.deleteDisplay = true;
                    $scope.deleteButton = false;
                    $scope.gatewayDetails = false;
                    $scope.editButton = false;
                    $scope.editLocationButton = false;
                    $scope.sensors = false;
                }
                $scope.deleteGateway = function(){
                    var deleteId = $sessionStorage.deleteGatewayId;
                    var networkId = $sessionStorage.netId;
                    gatewayService.deleteGateway(encodeduser, networkId, deleteId)
                        .then(function(){
                            $timeout(function(){
                                $window.location.reload();
                            }, 300)
                        })
                }
                $scope.cancelDelete = function(){
                    $scope.deleteDisplay = false;
                    $scope.deleteButton = true;
                    $scope.gatewayDetails = true;
                    $scope.editButton = true;
                    $scope.editLocationButton = true;
                    $scope.sensors = true;
                }

            }
        }
    });
}());