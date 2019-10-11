(function(){
    var app=angular.module("sensorApp");
    app.directive('deleteNetwork', function($sessionStorage,$localStorage,networkService, $timeout, $window){
        return{
            restrict: 'E',
            templateUrl: 'Networks/deleteNetworkView.html',
            controller: function($scope){
                $scope.deleteNetworkDisplay = false;
                $scope.deleteButton = true;
                if($localStorage.email && $localStorage.password){
                    $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                  $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                }
                $scope.startDeleteNetwork = function(network){
                    $scope.networks.forEach(function(val){
                        val.deleteDisplay = false;
                    });
                    $sessionStorage.deleteId = network.id;
                    $scope.networkName = network.name;
                    $scope.buttons = false;
                    network.deleteDisplay = true;
                    $scope.deleteNetworkDisplay = true;
                    $scope.deleteButton = false;
                    $scope.gatewayDetails = false;
                    $scope.editButton = false;
                    $scope.editLocationButton = false;
                }
                $scope.deleteNetwork = function(id){
                    id = $sessionStorage.deleteId;
                    networkService.deleteNetwork($scope.encodeduser, id)
                    .then(function(){
                        $timeout(function(){
                            $window.location.reload();
                        }, 300)
                    })
                }
                $scope.cancelDelete = function(){
                    $scope.deleteNetworkDisplay = false;                    
                    $scope.buttons = true;
                    $scope.deleteButton = true;
                    $scope.gatewayDetails = true;
                    $scope.editButton = true;
                    $scope.editLocationButton = true;
                }

            }
        }
    });
}());