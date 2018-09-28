var app = angular.module('sensorApp');
app.directive('map', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/map.html',
        controller: function(sensorModelService, d3, $scope, $sessionStorage, $localStorage, $window, $timeout, autentificationService){
            $scope.goBack = function(){
                $window.history.back();
                $sessionStorage.home = true;
                $sessionStorage.editLoc = false;
                $timeout(function(){
                    $window.location.reload();
                }, 100);
            } 
            if ($localStorage.email && $localStorage.password){
                $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            $scope.startEditLocation = function(gatewayAddress, clientAddress, name, uploadInterval, batchSize){
                $sessionStorage.home = false;
                $sessionStorage.gatewayAddress = gatewayAddress;
                $sessionStorage.clientAddress = clientAddress;
                $sessionStorage.name = name;
                $sessionStorage.uplInt = uploadInterval;
                $sessionStorage.batchSize = batchSize;
            }
            $scope.editLocation = function(){
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
                    .catch(function(response){
                        $scope.errorMessage = true;
                        $scope.message = response.data.message;
                        $scope.sensorEditError = true;
                        $scope.sensorEditSuccess = false;
                    });
            
            }
            var map = new google.maps.Map(d3.selectAll('#map').node(), {
                zoom: 4,
                center: new google.maps.LatLng(51.508742, -0.120850),
                mapTypeControl: false,
                streetViewControl: false
            });
            var marker;
            google.maps.event.addListener(map, "click", function(event){
              if($sessionStorage.register == true || $sessionStorage.editLoc == true){  
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
                                        .on("click", function (d) {
                                            if(!$sessionStorage.register && !$sessionStorage.editLoc){
                                                if( $scope.click==true ){
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
                                                                    .duration(0)
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
                                                            .duration(0)
                                                            .style("opacity", 0.9)
                                                        tooltip.html("Name: "+ d.value[2]+ "<br>" +"Active: "+ d.value[3]+ "<br>" + "Last value: "+ $scope.lastRead +"<br>" + "Last date: "+ $scope.lastDate)
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
                                    if(!$sessionStorage.editLoc){ 
                                        marker.append("circle")
                                            .data(sensors)
                                            .attr("r",11)
                                            .attr("cx", padding)
                                            .attr("cy", padding)
                                            .style("fill", function(d){
                                                if(d.sensorTypeId == 31){
                                                    return 'red';
                                                }
                                                if(d.sensorTypeId == 33){
                                                    return 'blue';
                                                }
                                                if(d.sensorTypeId == 34){
                                                    return '#4e9a06';
                                                }
                                                if(d.sensorTypeId == 35){
                                                    return 'black';
                                                }
                                            })
                                        marker.append("text")
                                           .data(sensors)
                                           .attr("x", padding+12)
                                           .attr("y", padding)
                                           .attr("dy", ".31em")
                                           .style("font-weight", "bold")
                                           .style("fill", function(d){
                                                if(d.sensorTypeId == 31){
                                                    return 'red';
                                                }
                                                if(d.sensorTypeId == 33){
                                                    return 'blue';
                                                }
                                                if(d.sensorTypeId == 34){
                                                    return '#4e9a06';
                                                }
                                                if(d.sensorTypeId == 35){
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
                        })
                })
        }
    }
            
})
        