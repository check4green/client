(function(){
var app = angular.module("sensorApp");
app.controller('editLocationCtrl', function($scope, $sessionStorage, $localStorage, $window, $timeout, sensorModelService, gatewayService){
    var vm = this;
    var timer;
    $scope.goBack = function(){
        $window.history.back();
        $sessionStorage.editLoc = false;
        timer = $timeout(function(){
            $window.location.reload();
        }, 100);
    } 
    $timeout.cancel(timer)
    if ($localStorage.email && $localStorage.password){
        var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
    }else{
        var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
    }
    $scope.name = $sessionStorage.name;
    $scope.editLocation = function(){
        if($sessionStorage.sens == true){
            var name = $sessionStorage.name;
            var uploadInterval = $sessionStorage.uplInt;
            var latitude = $sessionStorage.lat;
            var longitude = $sessionStorage.lng;
            $scope.editLoc = {name, uploadInterval, latitude, longitude}
            sensorModelService.updateSensors( encodedData,$sessionStorage.netId, $sessionStorage.sensorId ,$scope.editLoc)
                .then(function(){
                    $sessionStorage.lng = longitude;
                    $sessionStorage.lat = latitude;
                    $scope.showMessage = true;
                    $timeout(function(){
                        $window.history.back();
                        $sessionStorage.home = true;
                        $sessionStorage.editLoc = false;
                        $timeout(function(){
                            $window.location.reload();
                        }, 100);
                    }, 1000)

                })
                .catch(function(){
                    $scope.errorMessage = true;
                    $scope.message = 'Choose a location!';
                    $scope.sensorEditError = true;
                    $scope.sensorEditSuccess = false;
                });
        }
        if($sessionStorage.gateWay == true){
            var gatewayName = $sessionStorage.gatewayName;
            var lat = $sessionStorage.lat;
            var long = $sessionStorage.lng;
            var editGatewayLoc = {"name":gatewayName, "latitude": lat, "longitude": long};
            var networkId = $sessionStorage.netId;
            var gatewayId = $sessionStorage.gatewayEditId;
            gatewayService.updateGateway(encodedData, networkId, gatewayId, editGatewayLoc)
                .then(function(){
                    $sessionStorage.lng = long;
                    $sessionStorage.lat = lat;
                    $scope.showMessage = true;
                    $timeout(function(){
                        $window.history.back();
                        $sessionStorage.home = true;
                        $sessionStorage.editLoc = false;
                        $timeout(function(){
                            $window.location.reload();
                        }, 100);
                    }, 1000)
                })
        }
    
    }
});
}());