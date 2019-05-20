var app = angular.module('sensorApp');
app.controller('registerNetworkCtrl', function($scope, $window, $sessionStorage, $localStorage, $timeout, networkService){
    if($localStorage.email && $localStorage.password){
        $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
    }else {
      $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
    }
    $scope.registerNetwork = function(name){
        var network = {"name": name};
        networkService.addNetwork($scope.encodeduser, network)
            .then(function(){
                $scope.networkRegisterSuccess = true;
            })
            .catch(function(response){
                $scope.sensorRegisterError = true;
                $scope.message = response.message;
            })
    }
    $scope.cancelRegister = function(){
        $sessionStorage.buttons = true;
        $window.history.back();
        
    }
});