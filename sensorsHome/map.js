var app = angular.module('sensorApp');
app.directive('map', function(){
    return {
        restrict: 'E',
        templateUrl: 'sensorsHome/map.html',
        controller: function(sensorModelService, d3, $scope){
            var map = new google.maps.Map(d3.select('#map').node(), {
                zoom: 4,
                center: new google.maps.LatLng(51.508742, -0.120850),
                mapTypeControl: false,
                streetViewControl: false
            });
            //[Lng, Lat]
            d3.json("sensorsHome/stations.json", function(error, data){
                var overlay = new google.maps.OverlayView;
                overlay.onAdd = function() {
                    var layer = d3.select(this.getPanes().overlayLayer).append("div")
                                    .attr("class", "stations");
                    overlay.draw = function(){
                        var projection = this.getProjection(),
                            padding = 10;
                        var proj = d3.geoMercator()
                        // d3.select("#map")
                        //     .on("click", function(){
                        //             var pos = d3.mouse(d3.select("#map").node()),
                        //                 px= pos[0],
                        //                 py= pos[1];
                        //             var coordonates = proj.invert([px, py]);
                        //             console.log(coordonates)
                        //     })
                        var marker = layer.selectAll("svg")
                                .data(d3.entries(data))
                                .each(transform)
                                .enter().append("svg")
                                .each(transform)
                                .attr("class", "marker");
                        marker.append("circle")
                                .attr("r", 10.5)
                                .attr("cx", padding)
                                .attr("cy", padding)
                                .style("stroke", "black")
                                .style("stroke-width", 0.1)
                                .style("fill", "#4e9a06")
                        marker.append("text")
                                .attr("x", padding-16)
                                .attr("y", padding+4)
                                .attr("dx", padding)
                                .style("fill", "black")
                                .text(function(d){ return 50;});
                        marker.append("text")
                                .attr("x", padding+7)
                                .attr("y", padding)
                                .attr("dy", ".31em")
                                .style("font-weight", "bold")
                                .text(function(d){ return d.key});
                        function transform(d){
                            var marker = layer.selectAll("svg")
                            marker.append("circle")
                                .attr("r", 9)
                                .attr("cx", padding)
                                .attr("cy", padding)
                                .style("fill", "#4e9a06")
                                .style("stroke", "black")
                                .style("stroke-width", 0.1)
                            marker.append("text")
                                .attr("x", padding-16)
                                .attr("y", padding+4)
                                .attr("dx", padding)
                                .style("fill", "black")
                                .text(function(d){ return 50;});
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

        }
    }
            
})
        