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
                            var lat, long, name, status, gatewayAddress, clientAddress, sensTypeId;
                            for(var i=0; i< sensors.length; i++){
                                
                                lat = sensors[i].latitude;
                                long = sensors[i].longitude;
                                name = sensors[i].name;
                                status = sensors[i].active;
                                gatewayAddress = sensors[i].gatewayAddress;
                                clientAddress = sensors[i].clientAddress;
                                sensTypeId = sensors[i].sensorTypeId;
                                var loc = [long, lat, name, status, gatewayAddress, clientAddress, sensTypeId]
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
                                        .enter().append("svg")
                                        .each(transform)
                                        .attr("class", "marker")
                                        .on("mouseover", function (d) {
                                            if(!$sessionStorage.register){
                                            sensorModelService.getMeasurements(d.value[4], d.value[5], 1, 1)
                                                .then(lastReadSuccess)
                                                .catch(lastReadError)
                                                function lastReadSuccess(readings){
                                                    for (var i=0; i< readings.length; i++){
                                                        $scope.lastRead = readings[i].value;
                                                        $scope.lastDate = readings[i].readingDate
                                                    }
                                                    sensorModelService.getMeasureId(d.value[6])
                                                        .then(idSuccess)
                                                    function idSuccess(data){
                                                        $scope.id= data.measureId;
                                                        sensorModelService.getUnitOfMeasure($scope.id)
                                                            .then(unitOfMeasureSuccess)
                                                        function unitOfMeasureSuccess(data){
                                                            $scope.unitOfMeasure = data.unitOfMeasure;
                                                            tooltip.transition()
                                                                .duration(200)
                                                                .style("opacity", 0.9)
                                                            tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $scope.lastRead +" "+$scope.unitOfMeasure +
                                                                            "<br>" +"Last date: " +$scope.lastDate)
                                                        }
                                                    }
                                                    
                                                }
                                                
                                                function lastReadError(){
                                                    $scope.lastRead = "No data";
                                                    $scope.lastDate ="-"
                                                    tooltip.transition()
                                                        .duration(200)
                                                        .style("opacity", 0.9)
                                                    tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $scope.lastRead +"<br>" + "Last date: "+ $scope.lastDate)
                                                }
                                                
                                                tooltip
                                                    .style("left", (d3.event.pageX +5)+ "px")
                                                    .style("top", (d3.event.pageY -28)+ "px");
                                            }
                                        })
                                        .on("mouseout", function(){
                                            tooltip.transition()
                                                .duration(200)
                                                .style("opacity", 0);
                                        });
                                    google.maps.event.addListener(map,"mouseout", function(){
                                        tooltip.transition()
                                                .duration(200)
                                                .style("opacity", 0);
                                    }) 
                                    google.maps.event.addListener(map, "dragend", function(){
                                        tooltip.transition()
                                                .duration(200)
                                                .style("opacity", 0);
                                    })   
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
        