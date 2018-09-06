var app = angular.module('sensorApp');
app.directive('map', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/map.html',
        controller: function(sensorModelService, d3, $scope, $sessionStorage, $localStorage, autentificationService){
            var map = new google.maps.Map(d3.select('#map').node(), {
                zoom: 4,
                center: new google.maps.LatLng(51.508742, -0.120850),
                mapTypeControl: false,
                streetViewControl: false,
            });
            var id =1;
            var markers = [];
            google.maps.event.addListener(map, "click", function(event){
                var location = event.latLng;
                if($sessionStorage.register == true || $sessionStorage.editDisplay == true){
                    $sessionStorage.lng = event.latLng.lng();
                    $sessionStorage.lat = event.latLng.lat();
                    console.log("["+ $sessionStorage.lng +","+ $sessionStorage.lat +"]")
                    var mark = new google.maps.Marker({
                        position: location,
                        map:map,
                        animation: google.maps.Animation.DROP
                    })
                    mark.id = id;
                    id++;
                    markers.push(mark);
                    google.maps.event.addListener(mark, "click", function(event)
                    { 
                        function deleteMark(id){
                            for(var i=0; i<markers.length; i++){
                                if(markers[i].id == id){
                                    markers[i].setMap(null);
                                    markers.splice(i, 1);
                                    return;
                                }
                            }
                        }
                        deleteMark(mark.id);
                    })
                }
            })
            $sessionStorage.register = false;
            $sessionStorage.editDisplay = false;
            if($localStorage.email && $localStorage.password){
                $scope.encodeduser = btoa($localStorage.email + ':' + $localStorage.password);
            }else{
                $scope.encodeduser = btoa($sessionStorage.email + ':' + $sessionStorage.password);
            }
            autentificationService.getAllSensors($scope.encodeduser)
                .then(function(data){
                    $scope.pageSize = data
                    autentificationService.getUserSensors($scope.encodeduser, 0, $scope.pageSize)
                        .then(function(response){
                            var sensors = response.data;
                            var pos = [];
                            var lat, long, name;
                            for(var i=0; i< sensors.length; i++){
                                lat = sensors[i].latitude;
                                long = sensors[i].longitude;
                                var loc = [long, lat]
                                pos.push(loc)
                            }
                            var overlay = new google.maps.OverlayView;
                            overlay.onAdd = function() {
                                var layer = d3.select(this.getPanes().overlayLayer).append("div")
                                    .attr("class", "stations");
                                overlay.draw = function(){
                                    var projection = this.getProjection(),
                                    padding = 10;
                                    var marker = layer.selectAll("svg")
                                        .data(d3.entries(pos))
                                        .each(transform)
                                        .enter().append("svg")
                                        .each(transform)
                                        .attr("class", "marker");
                                    marker.append("circle")
                                        .attr("r",10.5)
                                        .attr("cx", padding)
                                        .attr("cy", padding);
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
                        })
                })
        }
    }
            
})
        