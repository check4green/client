(function(){
    var app = angular.module("sensorApp");
    app.controller("networksCtrl", function($scope, $localStorage, $sessionStorage, $location, $window, $timeout, networkService ){
        var vm = this;
        if($localStorage.email && $localStorage.password){
            var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        $scope.loadingNetworks = true;
        networkService.getNetworks(encodeduser)
            .then(function(response){
                $scope.networks = response.data;
                $scope.loadingNetworks = false;
                if($scope.networks.length == 0){
                    $scope.noNetworks = true;
                } else{
                    $scope.noNetworks = false;
                }
            })
            .catch(function(){
                $scope.noNetworks = false;
                $scope.serverError = true;
                $scope.loadingNetworks = false;

            });
        $scope.details = function(network){
            $scope.networks.forEach(function(val){
                val.detailsNetwork = false;
            })
            $sessionStorage.editLoc = false;
            $scope.networkDetails = true;
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            $scope.network = network;
        }

        $scope.cancelDetails = function(){
            $scope.buttons = true;
            $scope.networkDetails = false;
            delete $sessionStorage.allDevices;
            delete $sessionStorage.activeDevices;
            
        }
        $scope.sensorsGateways = function(network){
            $scope.networks.forEach(function(val){
                val.sensorsGatewaysButtons = false;
            });
            network.sensorsGatewaysButtons = true;
            $scope.sensorsGatewaysButtons = true;
        }
        $scope.cancelSensorsGateways = function(network) {
            network.sensorsGatewaysButtons = false;
            $scope.sensorsGatewaysButtons = false;

        }   
        $scope.filterGateways = function(network){
            $scope.networkName = network.name;
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            $location.path('/sensorsHome/gateways');
            $timeout(function(){
                $window.location.reload();

            }, 100)
        }
        $scope.filterSensors = function(network){
            $scope.networkName = network.name;
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            $location.path('/sensorsHome/sensors');
            $timeout(function(){
                $window.location.reload();

            }, 100)
        }
        $scope.getNetwork = function(network){
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            
        }
    });
}())