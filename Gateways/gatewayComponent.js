(function(){
    var app = angular.module("sensorApp");
    app.component('gateway', {
        templateUrl: 'Gateways/gatewayView.html',
        controller: 'gatewayCtrl',
        controllerAs : 'vm'
    });
    app.controller('gatewayCtrl', function($scope, $sessionStorage, $localStorage, $location, $timeout, $window, $filter, gatewayService){
        var vm = this;
        var networkId = $sessionStorage.netId;
        $scope.networkName = $sessionStorage.networkName;
        $scope.editLocationButton = true;
        $scope.editButton = true;
        $scope.backButton = true;
        if($localStorage.email && $localStorage.password){
            var encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
        }else {
            var encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
        }
        $scope.back = function(){
            delete $sessionStorage.netId;
            $location.path('sensorsHome/networks');
            $timeout(function(){
                $window.location.reload();

            }, 100)
        }
        function getGateways(user, netId, page, pageSize){
            $scope.loadingGateways = true;
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
                $scope.totalGateways = data;
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

            var searchMatch = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };
        
            $scope.search = function () {
                $scope.filteredItems = $filter('filter')($scope.gateways, function (item) {
                    if (searchMatch(item.name, $scope.filterSearch))
                        return true;
                    
                    return false;
                });
                $scope.gateways = $scope.filteredItems;
                vm.currentPage = 1;
                vm.allGateways = $scope.gateways.length;
                if($scope.filterSearch == ""){
                    vm.allGateways = data;
                    getGateways( encodeduser, networkId, 1, data)
                    

                }
                
                
            };
            $scope.showDetails = function(gateway){
                $scope.gateway = gateway;
                $sessionStorage.gatewayId = gateway.id;
                $scope.detailsData = true;
                $scope.detailsDisplay = true;
    
            };
            $scope.hideDetails = function(){
                $scope.detailsData = false;
                if($sessionStorage.activegateways == true){
                    getGateways( encodeduser, networkId, 1, data)                
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
                    $sessionStorage.activegateways = true;
                    for (var i=0; i< $scope.gateways.length; i++){
                        if($scope.gateways[i].active == true){
                            $scope.activeGateways.push($scope.gateways[i])
                        }
                    }
                    vm.allGateways = $scope.activeGateways.length;
                    vm.gatewaysPerPage = $scope.activeGateways.length;
                    $scope.gateways = $scope.activeGateways;
                } else{
                    $scope.loadingGateways = true;
                    $sessionStorage.activegateways = false;
                    vm.allGateways = data;
                    vm.gatewaysPerPage = 50;
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
        $scope.getgateway = function(id){
            gatewayService.getGateway(encodeduser, $sessionStorage.netId, id)
                .then(function(response){
                    var gateway = response.data;
                    $sessionStorage.gatewayEditId = gateway.id;
                    $sessionStorage.gatewayName = gateway.name;
                    $sessionStorage.gatewayLat = gateway.latitude;
                    $sessionStorage.gatewayLong = gateway.longitude;
                    var lat = gateway.latitude;
                    var long = gateway.longitude;
                    $sessionStorage.location = {lat: lat, lng: long};
                })
            
        }
    
    });
}());