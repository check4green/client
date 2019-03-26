(function(){
var app = angular.module("sensorApp");
app.controller('editLocationCtrl', function($scope, $sessionStorage, $localStorage, $window, $timeout, sensorModelService, d3){
    var vm = this;
    var timer;
    $scope.goBack = function(){
        $window.history.back();
        $sessionStorage.home = true;
        $sessionStorage.editLoc = false;
        timer = $timeout(function(){
            $window.location.reload();
        }, 100);
    } 
    $timeout.cancel(timer)
    if ($localStorage.email && $localStorage.password){
        $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
    }else{
        $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
    }
    
    $scope.name = $sessionStorage.name;
    $scope.editLocation = function(){
        var name = $sessionStorage.name;
        var uploadInterval = $sessionStorage.uplInt;
        var latitude = $sessionStorage.lat;
        var longitude = $sessionStorage.lng;
        $scope.editLoc = {name, uploadInterval, latitude, longitude}
        sensorModelService.updateSensors($scope.editLoc, $sessionStorage.gatewayAddress, $sessionStorage.clientAddress, $scope.encodedData)
            .then(function(){
                $sessionStorage.lng = longitude;
                $sessionStorage.lat = latitude;
                $scope.showMessage = true;
                
            })
            .catch(function(){
                $scope.errorMessage = true;
                $scope.message = 'Choose a location!';
                $scope.sensorEditError = true;
                $scope.sensorEditSuccess = false;
            });
    
    }
});
}());