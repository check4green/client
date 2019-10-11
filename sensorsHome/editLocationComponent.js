(function(){
    'use strict';
    var app = angular.module('sensorApp');
    
    app.component('editLocation', {
        templateUrl: 'sensorsHome/editLocationView.html',
        controller: 'editLocationCtrl',
        controllerAs: 'vm'
    });
    app.directive('editLoc', function(){
        return{
            restrict: 'E',
            templateUrl :'sensorsHome/editLocationView.html',
            controller: function($scope, $sessionStorage, $localStorage, $window, $timeout, sensorModelService, gatewayService){
                $scope.detailsDisplay = true;
                $scope.editLocationDisplay = false;
                if ($localStorage.email && $localStorage.password){
                    var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
                }else{
                    var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
                }
                $scope.startEditLoc = function(){
                    $scope.detailsDisplay = false;
                    $scope.editLocationDisplay = true;
                    $sessionStorage.editLoc = true;
                    document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('deleteButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('editButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                }
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
                                    $scope.editButton = true;
                                    $scope.detailsDisplay = true;
                                    $scope.editLocationDisplay = false;
                                    $scope.deleteButton = true;
                                    $scope.measurementsButton = true;
                                    $scope.editLocation = true;
                                    $scope.chartButton = true;
                                    $scope.sensorEditError = false;
                                    $scope.sensorEditSuccess = false;
                                    $scope.cards = false;
                                    $scope.grid = true;
                                    $scope.backButton = true;
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
                $scope.cancelEditLocation = function(){
                    $scope.detailsDisplay = true;
                    $scope.editLocationDisplay = false;
                } 
            }
        }
    })
}());