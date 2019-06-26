(function(){
    var app = angular.module('sensorApp');
    app.directive('map', function(){
        return {
            restrict: 'E',
            templateUrl: 'sensorsHome/map.html',
            controller: function(sensorModelService, d3, $scope, $sessionStorage, $localStorage, autentificationService, $rootScope, gatewayService, $timeout){
                if($localStorage.email && $localStorage.password){
                    var encodeduser = btoa($localStorage.email + ':' + $localStorage.password);
                }else{
                    var encodeduser = btoa($sessionStorage.email + ':' + $sessionStorage.password);
                }
                var map = new google.maps.Map(d3.selectAll('#map').node(), {
                    zoom: 4,
                    center: new google.maps.LatLng(51.508742, -0.120850),
                    mapTypeControl: false,
                    streetViewControl: false
                });
                var marker;
                if($sessionStorage.editLoc == true){
                    marker= new google.maps.Marker({
                        position: $sessionStorage.location,
                        map:map
                    })
                    map.setCenter($sessionStorage.location)
                }
                google.maps.event.addListener(map, "click", function(event){
                  if($sessionStorage.register == true || $sessionStorage.editLoc == true || $sessionStorage.gatewayRegister == true){  
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
                    } else{
                        marker.setPosition(location);
                        $sessionStorage.lat = marker.getPosition().lat();
                        $sessionStorage.lng = marker.getPosition().lng();
                    }
                }
                $sessionStorage.lat = null;
                $sessionStorage.lng = null;
                if(($sessionStorage.register == true) || ($sessionStorage.editLoc == true) || ($sessionStorage.gatewayRegister == true)){
                    $scope.legend = false;
                } else{
                    $scope.legend = true;
                }



                autentificationService.getAllSensors(encodeduser, $sessionStorage.netId)
                    .then(function(data){
                        var loading = true;
                        var pageSize = data;
                        autentificationService.getUserSensors(encodeduser,$sessionStorage.netId, 0, pageSize)
                            .then(function(response){
                                var sensors = response.data;
                                var pos = [];
                                var lat, long, name, status,address, id, sensTypeId;
                                if($sessionStorage.netDet == true || $scope.registerDisplay==true || $sessionStorage.gatewayRegister == true){
                                    $scope.gate = true;
                                    gatewayService.getGateways(encodeduser, $sessionStorage.netId, 0, pageSize)
                                        .then(function(response){
                                            $scope.gateway = response.data;
                                            for(var i=0; i<$scope.gateway.length; i++){
                                                lat = $scope.gateway[i].latitude;
                                                long = $scope.gateway[i].longitude;
                                                name = $scope.gateway[i].name;
                                                status = $scope.gateway[i].active;
                                                address = $scope.gateway[i].address;
                                                id = $scope.gateway[i].id;
                                                sensTypeId = 0;
                                                var loc = [long, lat, name, status, address, id, sensTypeId];
                                                if(long !=0 && lat!=0){
                                                    pos.push(loc);
                                                    loading = false;
                                                }
                                            }
                                            
                                        });
                                        for(var i=0; i< sensors.length; i++){
                                            lat = sensors[i].latitude;
                                            long = sensors[i].longitude;
                                            name = sensors[i].name;
                                            status = sensors[i].active;
                                            address = sensors[i].address;
                                            id = sensors[i].id;
                                            sensTypeId = sensors[i].sensorTypeId;
                                            var loc = [long, lat, name, status, address, id, sensTypeId]
                                            if(long !=0 && lat!=0){
                                                pos.push(loc)
                                                loading = false;
                                            }
                                        }
                                } else{
                                    for(var i=0; i< sensors.length; i++){
                                        lat = sensors[i].latitude;
                                        long = sensors[i].longitude;
                                        name = sensors[i].name;
                                        status = sensors[i].active;
                                        address = sensors[i].address;
                                        id = sensors[i].id;
                                        sensTypeId = sensors[i].sensorTypeId;
                                        var loc = [long, lat, name, status, address, id, sensTypeId]
                                        if(long !=0 && lat!=0){
                                            pos.push(loc)
                                            loading = false;
                                        }
                                    }
                                }
                                $timeout(function(){
                                    var overlay = new google.maps.OverlayView;
                                    overlay.onAdd = function() {
                                        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                                            .attr("class", "stations");
                                        overlay.draw = function(){
                                            var projection = this.getProjection(),
                                            padding = 10;
                                            $scope.click = true;
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
                                                    .style("width", "35px")
                                                    .style("height", "35px")
                                                    .on("click", function (d) {
                                                        if(!$sessionStorage.register && !$sessionStorage.editLoc && !$sessionStorage.gatewayRegister){
                                                            if( $scope.click==true){
                                                                if( d.value[6] !=0){
                                                                    sensorModelService.getMeasurements(encodeduser, $sessionStorage.netId, d.value[5], 1, 1, )
                                                                        .then(lastReadSuccess)
                                                                        .catch(lastReadError)
                                                                    function lastReadSuccess(readings){
                                                                        for (var i=0; i< readings.length; i++){
                                                                            $rootScope.lastRead = readings[i].value;
                                                                            $rootScope.lastDate = readings[i].readingDate
                                                                        }
                                                                        sensorModelService.getMeasureId(d.value[6])
                                                                            .then(idSuccess)
                                                                        function idSuccess(data){
                                                                            $scope.id= data.measureId;
                                                                            sensorModelService.getUnitOfMeasure($scope.id)
                                                                                .then(unitOfMeasureSuccess)
                                                                            function unitOfMeasureSuccess(data){
                                                                                $scope.unitOfMeasure = data.unitOfMeasure;
                                                                                if(d.value[6] == 6){
                                                                                    if($rootScope.lastRead == 100){
                                                                                        $rootScope.lastRead = 'x';
                                                                                    }else if($rootScope.lastRead == 200){
                                                                                            $rootScope.lastRead = 'y';
                                                                                        } else if($rootScope.lastRead == 300){
                                                                                            $rootScope.lastRead = 'z';
                                                                                        } else if($rootScope.lastRead == 400){
                                                                                            $rootScope.lastRead = 'xy';
                                                                                        } else if($rootScope.lastRead == 500){
                                                                                            $rootScope.lastRead = 'xz';
                                                                                        } else if($rootScope.lastRead == 600){
                                                                                            $rootScope.lastRead = 'yz';
                                                                                        } else if($rootScope.lastRead == 700){
                                                                                            $rootScope.lastRead = 'xyz';
                                                                                        }
                                                                                        tooltip.transition()
                                                                                        .duration(0)
                                                                                        .style("opacity", 0.9)
                                                                                    tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last alert: "+ $rootScope.lastRead +
                                                                                                "<br>" +"Last date: " +$rootScope.lastDate)
                                                                                    
                                                                                }else {
                                                                                tooltip.transition()
                                                                                    .duration(0)
                                                                                    .style("opacity", 0.9)
                                                                                tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $rootScope.lastRead +" "+$scope.unitOfMeasure +
                                                                                            "<br>" +"Last date: " +$rootScope.lastDate)
                                                                                }
                                                                            }
                                                                        }
                                                                        if(readings.length==0){
                                                                            $rootScope.lastRead = "No data";
                                                                            $rootScope.lastDate ="-";
                                                                            if(d.value[5] == 6){
                                                                                tooltip.transition()
                                                                                    .duration(0)
                                                                                    .style("opacity", 0.9)
                                                                                tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last alert: "+ $rootScope.lastRead +"<br>" + "Last date: "+ $rootScope.lastDate)
                                                                            }else{
                                                                                tooltip.transition()
                                                                                    .duration(0)
                                                                                    .style("opacity", 0.9)
                                                                                tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $rootScope.lastRead +"<br>" + "Last date: "+ $rootScope.lastDate)
                                                                            }
                                                                        }
                                                                    
                                                                    }
                                                                
                                                                    function lastReadError(){
                                                                        $rootScope.lastRead = "No data";
                                                                        $rootScope.lastDate ="-";
                                                                        if(d.value[6] == 6){
                                                                            tooltip.transition()
                                                                            .duration(0)
                                                                            .style("opacity", 0.9)
                                                                        tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last alert: "+ $rootScope.lastRead +"<br>" + "Last date: "+ $rootScope.lastDate)
                                                                        }else{
                                                                        tooltip.transition()
                                                                            .duration(0)
                                                                            .style("opacity", 0.9)
                                                                        tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $rootScope.lastRead +"<br>" + "Last date: "+ $rootScope.lastDate)
                                                                        }
                                                                    }
                                                                

                                                                } else{

                                                                    tooltip.transition()
                                                                    .duration(0)
                                                                    .style("opacity", 0.9)
                                                                tooltip.html("Gateway name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3])
                                                                }
                                                                tooltip
                                                                    .style("left", (d3.event.pageX +5)+ "px")
                                                                    .style("top", (d3.event.pageY -28)+ "px");
                                                            } 
                                                        }else{
                                                            tooltip.transition()
                                                                .duration(200)
                                                                .style("opacity", 0);
                                                        }
                                                        $scope.click = !$scope.click;
                                                    })
                                                    .on('mouseout', function(){
                                                        tooltip.transition()
                                                            .duration(200)
                                                            .style("opacity", 0);
                                                        $scope.click = true;

                                                    })
                                                
                                                google.maps.event.addListener(map,"mouseout", function(){
                                                    $scope.click = true;
                                                    tooltip.transition()
                                                            .duration(200)
                                                            .style("opacity", 0);
                                                }) 
                                                google.maps.event.addListener(map, "dragend", function(){
                                                    tooltip.transition()
                                                            .duration(200)
                                                            .style("opacity", 0);
                                                }) 
                                                if(!$sessionStorage.editLoc && !loading){ 
                                                    marker.append("circle")
                                                        .data(d3.entries(pos))
                                                        .attr("r",function(d){
                                                            if(d.value[6] == 0){
                                                                return 12;
                                                            } else{
                                                                return 8;
                                                            }
                                                        })
                                                        .attr("cx", padding)
                                                        .attr("cy", padding)
                                                        .style("fill", function(d){
                                                            if(d.value[6] == 2){
                                                                return 'red';
                                                            }
                                                            if(d.value[6] == 1){
                                                                return 'blue';
                                                            }
                                                            if(d.value[6] == 7){
                                                                return '#4e9a06';
                                                            }
                                                            if(d.value[6] == 3){
                                                                return 'black';
                                                            }
                                                            if(d.value[6] == 6){
                                                                return '#bd611f';
                                                            }
                                                            if(d.value[6] == 5){
                                                                return '#FFFF00'
                                                            }
                                                            if(d.value[6] == 0){
                                                                return '#FFFFFF'
                                                            }
                                                        })
                                                    marker.append("text")
                                                       .data(d3.entries(pos))
                                                       .attr("x", padding+12)
                                                       .attr("y", padding)
                                                       .attr("dy", ".31em")
                                                       .style("font-weight", "bold")
                                                       .style("fill", function(d){
                                                            if(d.value[6] == 2){
                                                                return 'red';
                                                            }
                                                            if(d.value[6] == 1){
                                                                return 'blue';
                                                            }
                                                            if(d.value[6] == 7){
                                                                return '#4e9a06';
                                                            }
                                                            if(d.value[6] == 3){
                                                                return 'black';
                                                            }
                                                       })
                                                       .style("font-size", "12px")
                                                       .text(function(d){ return d.name;})
                                                   
                                                }
                                            
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
                                    if(data == 0){
                                        $scope.noSensors = true;
                                    }else{
                                        $scope.noSensors = false;
                                    }
                                }, 1000)
                            })
                    })
                
            }
        }
            
    });
}());
        