var app = angular.module('sensorApp');
app.directive('map', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/map.html',
        controller: function(sensorModelService, d3, $scope, $sessionStorage, $localStorage, autentificationService){
            var map = new google.maps.Map(d3.selectAll('#map').node(), {
                zoom: 4,
                center: new google.maps.LatLng(51.508742, -0.120850),
                mapTypeControl: false,
                streetViewControl: false
            });
            var marker;
            google.maps.event.addListener(map, "click", function(event){
              if($sessionStorage.register == true){  
                  placeMarker(map, event.latLng)
                }
            })
            function placeMarker(map, location){
                if(!marker || !marker.setPosition){
                    marker= new google.maps.Marker({
                        position: location,
                        map:map
                    })
                    $sessionStorage.lat = marker.getPosition().lat();
                    $sessionStorage.lng = marker.getPosition().lng();
                    console.log("["+$sessionStorage.lng+ "," + $sessionStorage.lat+ "]");
                } else{
                    marker.setPosition(location);
                    $sessionStorage.lat = marker.getPosition().lat();
                    $sessionStorage.lng = marker.getPosition().lng();
                    console.log("["+$sessionStorage.lng+ "," + $sessionStorage.lat+ "]");
                }
            }
            $sessionStorage.register = false;
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
                            var lat, long, name, status;
                            for(var i=0; i< sensors.length; i++){
                                // sensorModelService.getMeasurements(sensors[i].gatewayAddress, sensors[i].clientAddress, 1, 1)
                                //     .then(lastReadSuccess)
                                //     .catch(lastReadError)
                                // function lastReadSuccess(data){
                                //     $scope.lastRead = data;
                                //     for(var i=0; i< $scope.lastRead.length; i++){
                                //         $scope.lastRead = $scope.lastRead[i].value;
                                //     }
                                // }
                                // function lastReadError(){
                                //     $scope.lastRead = "No data"
                                // }
                                
                                    lat = sensors[i].latitude;
                                    long = sensors[i].longitude;
                                    name = sensors[i].name;
                                    status = sensors[i].active
                                    var loc = [long, lat, name, status]
                                    pos.push(loc)
                                
                            }
                            var overlay = new google.maps.OverlayView;
                            overlay.onAdd = function() {
                                var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                                    .attr("class", "stations");
                                overlay.draw = function(){
                                    var projection = this.getProjection(),
                                    padding = 10;
                                    var tooltip  = d3.select("body")
                                                    .append("div")
                                                    .attr("class", "tooltip")
                                                    .style("opacity", 0);
                                    var marker = layer.selectAll("svg")
                                        .data(d3.entries(pos))
                                        .each(transform)
                                        .enter().append("svg:svg")
                                        .each(transform)
                                        .attr("class", "marker")
                                        .on("mouseover", function (d) {
                                                tooltip.transition()
                                                    .duration(200)
                                                    .style("opacity", 0.9)
                                                tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3])
                                                    .style("left", (d3.event.pageX +5)+ "px")
                                                    .style("top", (d3.event.pageY -28)+ "px");
                                            
                                            }) 
                                            .on("mouseout", function mouseout() {
                                                tooltip.transition()
                                                    .duration(200)
                                                    .style("opacity", 0);
                                            });
                                        
                                    marker.append("circle")
                                        .attr("r",11)
                                        .attr("cx", padding)
                                        .attr("cy", padding)
                                    marker.append("text")
                                           .data(sensors)
                                           .attr("x", padding+12)
                                           .attr("y", padding)
                                           .attr("dy", ".31em")
                                           .style("font-weight", "bold")
                                           .style("fill", "#4e9a06")
                                           .style("font-size", "12px")
                                           .text(function(d){ return d.name;})
                                    
                                    
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
        