(function(){
    var app = angular.module("sensorApp");
    app.controller("networksCtrl", function($scope, $localStorage, $sessionStorage, $location, networkService){
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

            })
            
        $scope.filterGateways = function(network){
            $scope.networkName = network.name;
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            $location.path('/sensorsHome/devices')
        }
        $scope.getNetwork = function(network){
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            
        }
    });
}())