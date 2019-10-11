var app = angular.module('sensorApp');
app.controller('registerGatewayCtrl', function($scope, $window, gatewayService, $localStorage, $sessionStorage, d3){
    if($localStorage.email && $localStorage.password){
        $scope.encodeduser = btoa($localStorage.email +':'+ $localStorage.password);
    }else {
      $scope.encodeduser = btoa($sessionStorage.email +':'+ $sessionStorage.password);
    }
    $sessionStorage.gatewayRegister = true;
    var map = new google.maps.Map(d3.selectAll('#registerGatewayMap').node(), {
        zoom: 4,
        center: new google.maps.LatLng(51.508742, -0.120850),
        mapTypeControl: false,
        streetViewControl: false
    });
    var marker;
    map.setCenter($sessionStorage.location)
    google.maps.event.addListener(map, "click", function(event){
        placeMarker(map, event.latLng)
        
    })
    function placeMarker(map, location){
        if(marker == null){
            marker= new google.maps.Marker({
                position: location,
                map:map
            })
            $scope.latitude = marker.getPosition().lat();
            $scope.longitude = marker.getPosition().lng();
        } else{
            marker.setPosition(location);
            $scope.latitude = marker.getPosition().lat();
            $scope.longitude = marker.getPosition().lng();
        }
    }
    var overlay = new google.maps.OverlayView;
    overlay.onAdd = function() {
        overlay.draw = function(){
            var projection = this.getProjection(),
            padding = 10;
            function transform(d){
                d = new google.maps.LatLng(d.value[1], d.value[0]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) +"px");
            }
        }
        
    }
    overlay.setMap(map);
    $scope.registerGateway = function(address, name){
        if($scope.latitude == null && $scope.longitude == null){
            var lat = 0;
            var lng = 0;
        } else{
            var lat = $scope.latitude;
            var lng = $scope.longitude;
        }
        var gateway = {'address': address, 'name': name, "latitude":lat, "longitude":lng}
        var networkId = $sessionStorage.netId;
        gatewayService.addGateway($scope.encodeduser, networkId, gateway)
            .then(function(){
                $scope.gatewayRegisterSuccess = true;
                $scope.gatewayRegisterError = false;
            })
            .catch(function(response){
                $scope.gatewayRegisterError = true;
                $scope.gatewayRegisterSuccess = false;
                $scope.message = response.message;
            })
    }
    $scope.cancelRegister = function(){
        $sessionStorage.gatewayRegister = false;
        $window.history.back();
    }
   
});