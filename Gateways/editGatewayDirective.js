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
                    $scope.gateways.forEach(function(val){
                        val.editDisplay = false;
                    });
                    $scope.editGatewaySuccess = false;
                    $scope.editGatewayerror = false;
                    $scope.detailsButton = false;
                    gateway.editDisplay = true;
                    $scope.sensors = false;
                    $sessionStorage.editGatewayId = gateway.id;
                    $scope.editButton = false;
                    $scope.editDisplay = true;
                    $scope.deleteButton = false;
                    $scope.editLocationButton = false;
                    $scope.gatewayDetails = false;
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
    app.component('editgateway', {
        templateUrl: 'Gateways/editGatewayView.html',
        controller: 'editGatewayCtrl',
        controllerAs: 'vm'
    });
}());