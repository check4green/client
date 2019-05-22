(function(){
    var app = angular.module("sensorApp");
    app.component('gateway', {
        templateUrl: 'Gateways/gatewayView.html',
        controller: 'gatewayCtrl',
        controllerAs : 'vm'
    });
    app.controller('gatewayCtrl', function($scope, $sessionStorage, $localStorage, $location, $timeout, $window, gatewayService){
        var vm = this;
        vm.titleGrid = 'Gateways';
        $scope.editLocationButton = true;
        $scope.editButton = true;
        if($sessionStorage.buttons == true){
            $scope.buttons = true
        }else {
            $scope.buttons = false;
            $scope.backButton = true;
        }
        if($sessionStorage.netName){
            $scope.networkName = $sessionStorage.netName
        }
        if($localStorage.email && $localStorage.password){
            var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        $scope.backButton = true;
        $scope.back = function(){
            $sessionStorage.gate = false;
            $scope.gatewayData = false;
            $scope.sensorData = false;
            $scope.noSensorData = false;
            $scope.buttons = true;
            $scope.registerButton = false;
            $sessionStorage.buttons = true;
            $sessionStorage.cards = false;
            delete $sessionStorage.netId;
            $location.path('sensorsHome/networks');
            $timeout(function(){
                $window.location.reload();

            }, 100)
        }
        var networkId = $sessionStorage.netId
        function getGateways(user, netId, page, pageSize){
            $scope.loadingGateways = true;
            $scope.networkName = $sessionStorage.networkName;
            gatewayService.getGateways(user, netId, page, pageSize)
                    .then(function(response){
                        $scope.gateways = response.data;
                        $scope.loadingGateways = false;
                        if ($scope.gateways.length == 0){
                            $scope.noGateways = true;
                            $scope.gatewayData = false;
                        }
                        else{
                            $scope.noGateways = false;
                            $scope.gatewayData = true;
                        }
                        
                    })
                    .catch(function(){
                        $scope.gatewayServerError = true;
                        $scope.loadingGateways = false;

                    })
        }
        
        gatewayService.getAllGateways(encodeduser, $sessionStorage.netId)
            .then(function(data){
                vm.allGateways = data;
                $scope.countActiveGateways = 0;
                $scope.countInactiveGateways = 0;
                vm.gatewaysPerPage = 50;
                vm.currentPage = 1;
                gatewayService.getGateways(encodeduser, networkId, vm.currentPage, data)
                .then(function(response){
                    var actGateways = response.data;
                    for(var i=0;i<actGateways.length; i++){
                        if(actGateways[i].active == true){
                            $scope.countActiveGateways ++;
                        }
                        else{
                            $scope.countInactiveGateways ++;
                        }
                    }
                })
            function setPage(){
                getGateways( encodeduser, networkId, 1, data)
                    
            }
            $scope.$watch('vm.currentPage', setPage);
            $scope.setPageSize = function(modelSize){
                if(modelSize){
                    vm.gatewaysPerPage = modelSize;
                    getGateways(encodeduser, networkId, 1, vm.gatewaysPerPage)
                }
            }
        
            vm.expandSelected = function(gateway){
                $scope.gateways.forEach(function(val){
                    val.expanded=false;
                })
                gateway.expanded=true;
            };
            $scope.showActiveGateways = function(value){
                if (value == true){
                    $scope.activeGateways = [];
                    for (var i=0; i< $scope.gateways.length; i++){
                        if($scope.gateways[i].active == true){
                            $scope.activeGateways.push($scope.gateways[i])
                        }
                    }
                    $scope.gateways = $scope.activeGateways;
                } else{
                    $scope.loadingGateways = true;
                    gatewayService.getGateways(encodeduser, networkId)
                    .then(function(response){
                        $scope.gateways = response.data;
                        $scope.loadingGateways = false;
                        $scope.gatewayServerError = false;
                        if ($scope.gateways.length == 0){
                            $scope.noGateways = true;
                            $scope.gatewayData = false;
                        }
                        else{
                            $scope.noGateways = false;
                            $scope.gatewayData = true;
                        }
                        for(var i=0;i<$scope.gateways.length; i++){
                            if($scope.gateways[i].active == true){
                                $scope.countActiveGateways ++;
                            }
                            else{
                                $scope.countInactiveGateways ++;
                            }
                        }
                    })
                    .catch(function(){
                        $scope.gatewayServerError = true;
                        $scope.loadingGateways = false;
                    })
                }
            }
        })
        if($sessionStorage.gatewayCards == true){
            $scope.gatewayGrid = false;
            $scope.gatewayCards = true;
        } else{
            $scope.gatewayGrid = true;
            $scope.gatewayCards = false;
        }
        $scope.changeGateway = true;
        $scope.changeLayoutGatewayCards = function(){
            $scope.gatewayGrid = false;
            $scope.gatewayCards = true;
            $sessionStorage.gatewayCards = true;
        } 
        $scope.changeGatewayLayoutGrid = function(){
            $scope.gatewayGrid = true;
            $scope.gatewayCards = false;
            $sessionStorage.gatewayCards = false;
        }
        $scope.gatewayId = function(id, name, latitude, longitude){
            $sessionStorage.gatewayEditId = id;
            $sessionStorage.gatewayName = name;
            $sessionStorage.gatewayLat = latitude;
            $sessionStorage.gatewayLong = longitude;
        }
    
        
        $scope.getNetwork = function(network){
            $sessionStorage.networkName = network.name;
            $sessionStorage.netId = network.id;
            
        }
        $scope.startEditLocation = function( name, lat, long){
            $sessionStorage.name = name;
            $sessionStorage.location = {lat: lat, lng: long};
        }
    
    });
}());