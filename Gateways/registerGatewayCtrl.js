var app = angular.module('sensorApp');
app.controller('registerGatewayCtrl', function($scope, $window, gatewayService, $localStorage, $sessionStorage){
    if($localStorage.email && $localStorage.password){
        $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
    }else {
      $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
    }
    $sessionStorage.gatewayRegister = true;
    $scope.registerGateway = function(address, name){
        if($sessionStorage.lat == null && $sessionStorage.lng == null){
            var lat = 0;
            var lng = 0;
        } else{
            var lat = $sessionStorage.lat;
            var lng = $sessionStorage.lng;
        }
        var gateway = {'address': address, 'name': name, "latitude":lat, "longitude":lng}
        var networkId = $sessionStorage.networkId;
        gatewayService.addGateway($scope.encodeduser, networkId, gateway)
            .then(function(){
                $scope.gatewayRegisterSuccess = true;
            })
            .catch(function(response){
                $scope.gatewayRegisterError = true;
                $scope.message = response.message;
            })
    }
    $scope.cancelRegister = function(){
        $sessionStorage.gatewayRegister = false;
        $window.history.back();
    }
   
});