(function(){
    var app = angular.module("sensorApp");
    app.directive('editNetwork', function(networkService, $localStorage, $sessionStorage, $timeout, $window){
        return{
            restrict:'E',
            templateUrl: 'Networks/editNetworkView.html',
            controller: function($scope){
                $scope.editButton = true;
                $scope.editNetworkDisplay = false;
                if($localStorage.email && $localStorage.password){
                    $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
                }else {
                  $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
                };
                $scope.startEditNetwork = function(network){
                    $scope.networks.forEach(function(val){
                        val.editDisplay = false;
                    });
                    $scope.serverError = false;
                    $sessionStorage.editId = network.id;
                    $scope.networkName = network.name;
                    $scope.buttons = false;
                    $scope.detailsButton = false;
                    network.editDisplay = true;
                    $scope.editButton = false;
                    $scope.editNetworkDisplay = true;
                }
                $scope.editNetwork = function(id, name){
                    id = $sessionStorage.editId;
                    var network = {'name': name}
                    networkService.updateNetwork($scope.encodeduser, id, network)
                        .then(function(){
                            $timeout(function(){
                                $window.location.reload();
                            })
                        })
                        .catch(function(response){
                            $scope.errorEdit = true;
                            $scope.message = response.message;
                        })
                }
                $scope.cancelEdit = function(){
                    $scope.buttons = true;
                    $scope.detailsButton = true;
                    $scope.editButton = true;
                    $scope.editNetworkDisplay = false;

                }
            }
        }
    });
}());