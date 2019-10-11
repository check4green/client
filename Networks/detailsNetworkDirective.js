(function(){
    var app = angular.module("sensorApp");
    app.directive('detailsNet', function(){
        return{
            restrict: 'E',
            templateUrl:'Networks/detailsNetworkView.html',
            controller: function($scope, $localStorage, $sessionStorage, gatewayService, autentificationService){
                if($localStorage.email && $localStorage.password &&($localStorage.email != 0 && $localStorage.password !=0)){
                    var encodeduser = btoa($localStorage.email+ ':'+ $localStorage.password)
                }else{
                    var encodeduser = btoa($sessionStorage.email+ ':'+ $sessionStorage.password)
                }
                // if($sessionStorage.allDevices || $sessionStorage.allDevices == 0){
                //     $scope.allDevices = $sessionStorage.allDevices;
                // }
                // if($sessionStorage.activeDevices || $sessionStorage.activeDevices ==0){
                //     $scope.activeDevices = $sessionStorage.activeDevices;
                // }
                
                $scope.name = $sessionStorage.networkName;
                $scope.activeDevices =0;
                $scope.loading = true;
                gatewayService.getAllGateways(encodeduser, $sessionStorage.netId)
                    .then(function(total){
                        $scope.allGate = parseInt(total);
                        gatewayService.getGateways(encodeduser, $sessionStorage.netId)
                            .then(function(response){
                                var actGateways = response.data;
                                for(var i=0; i< actGateways.length; i++){
                                    if(actGateways[i].active == true){
                                        $scope.activeDevices ++;
                                    } 
                                }
                            })
                    })
                autentificationService.getAllSensors(encodeduser, $sessionStorage.netId)
                    .then(function(data){
                        $scope.allSens = parseInt(data);
                        $sessionStorage.allDevices = $scope.allDevices;
                        autentificationService.getUserSensors(encodeduser, $sessionStorage.netId, 1, $scope.allSens)
                            .then(function(response){
                                var actSensors = response.data;
                                for(var i=0; i<actSensors.length; i++){
                                    if(actSensors[i].active == true){
                                        $scope.activeDevices ++;
                                    } 
                                }
                                $sessionStorage.activeDevices = $scope.activeDevices;
                                $scope.allDevices = $scope.allSens + $scope.allGate;
                                $scope.loading = false;
                                if($scope.allDevices == 0){
                                    $scope.noSensors = true;
                                } else{
                                    $scope.noSensors = false;
                                }
                            })
                    })
                
            }
        }
    });
}());