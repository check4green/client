(function(){
    var app = angular.module("sensorApp");
    app.controller('editGatewayCtrl', function($scope, $window, $sessionStorage, $localStorage, $timeout, gatewayService){
        var vm = this;
        vm.title = 'Edit gateway'
        $scope.editGCards = true;
        $scope.editButton = false;
        $scope.editDisplay = true;
        $scope.detailsButton = false;
        $scope.editButton = false;
        $scope.editDisplay = true;
        $scope.deleteButton = false;
        $scope.sensors = false;
        $scope.editLocationButton = false;
        $scope.gatewayDetails = false;
        $scope.editGatewayRoute = true;
        $scope.gatewayName = $sessionStorage.gatewayName;
        if($localStorage.email && $localStorage.password){
            $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
          $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        $scope.editGateway= function(name){
            var lat = $sessionStorage.gatewayLat;
            var long = $sessionStorage.gatewayLong;
            var gateway = {'name' : name, 'latitude': lat, 'longitude': long};
            var networkId = $sessionStorage.netId;
            var id = $sessionStorage.gatewayEditId;
            gatewayService.updateGateway($scope.encodeduser, networkId, id, gateway)
            .then(function(){
                $scope.editGatewaySuccess = true;
                $timeout(function(){
                    $scope.editGCards = false;
                    $scope.detailsButton = true;
                    $scope.editButton = true;
                    $scope.editDisplay = false;
                    $scope.deleteButton = true;
                    $scope.editLocationButton = true;
                    $scope.gatewayDetails = true;
                    $window.history.back();
                }, 1000)
            })
            .catch(function(response){
                $scope.editGatewayerror = true;
                $scope.message = response.message;
            })
        }
        $scope.cancelEdit = function(){
            $scope.editGCards = false;
            $scope.detailsButton = true;
            $scope.editButton = true;
            $scope.editDisplay = false;
            $scope.deleteButton = true;
            $scope.editLocationButton = true;
            $scope.gatewayDetails = true;
            $window.history.back();
        }
    });
}());