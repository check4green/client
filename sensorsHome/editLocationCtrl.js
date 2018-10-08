var app = angular.module("sensorApp");
app.controller('editLocationCtrl', function($scope, $sessionStorage, $localStorage, $window, $timeout, sensorModelService, d3){
    var vm = this;
    $scope.goBack = function(){
        $window.history.back() 
        $sessionStorage.editLoc = false;
        $sessionStorage.home = true;
        $timeout(function(){
            $window.location.reload();
        }, 100);
        
    } 
    if ($localStorage.email && $localStorage.password){
        $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
    }else{
        $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
    }
    
    $scope.editLocation = function(){
        var lat = $sessionStorage.latitude;
        var long = $sessionStorage.longitude;
        var name = $sessionStorage.name;
        var uploadInterval = $sessionStorage.uplInt;
        var batchSize = $sessionStorage.batchSize;
        var latitude = $sessionStorage.lat;
        var longitude = $sessionStorage.lng;
        $scope.editLoc = {name, uploadInterval, batchSize, latitude, longitude}
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
})