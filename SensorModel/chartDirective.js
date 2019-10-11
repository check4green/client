    (function(){
    var app = angular.module('sensorApp');
    app.directive('chartd3', function(){
        return {
        restrict: 'E',
        templateUrl: 'SensorModel/chartDirectiveView.html',
        controller: function chartd3Ctrl(sensorModelService, d3, $scope, SENSOR_TYPE, $localStorage, $sessionStorage){
                    var readings = 1000;
                    $scope.chartDisplay = false;
                    
                    if ($localStorage.email && $localStorage.password){
                        var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
                    }else{
                        var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
                    }
                $scope.chart = function(id){
                    document.getElementById('chartButton').style.backgroundColor = '#244E70';
                    document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                    document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                    document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('details').style.backgroundColor = '#3CDB41';
                    document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                    document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                    var page = 0
                    $scope.value = false;
                    $scope.gatewayButton = false;
                    $scope.editLocationDisplay = false;
                    $scope.chartDisplay = true;
                    $scope.detailsDisplay = false;
                    $scope.editDisplay = false;
                    $scope.showGateways = false;
                    $scope.deleteDisplay = false;
                    $scope.measurementsDisplay = false; 
                    $scope.measurementsButton = false;
                    $scope.noDataChart = false;
                    $scope.loadingChart = true;
                    $scope.dataChart = false;
                    d3.selectAll("#chart > *").remove();
                    sensorModelService.getMeasurements(encodedData, $sessionStorage.netId, id, page, readings)
                                .then(getSuccess)
                                .catch(getError);
                                function getError(){
                                    $scope.noDataChart = true;
                                    $scope.loadingChart = false;
                                    $scope.dataChart = false;
                                }
                                function getSuccess(data){
                                    $scope.noDataChart = false;
                                    $scope.loadingChart = false;
                                    $scope.dataChart = true;
                                    var measurements = data;
                                    if(measurements.length == 0){
                                        $scope.noDataChart = true;
                                        $scope.loadingChart = false;
                                        $scope.dataChart = false;
                                    }
                                for (var i=0; i<measurements.length; i++){
                                   measurements[i].readingDate = measurements[i].readingDate.substr(0, 10)+" " +measurements[i].readingDate.substr(11, 8);
                                   if($scope.vibrations == false){
                                   if(measurements[i].value >= $scope.outOfRangePositiveError){
                                        measurements[i].value = $scope.outOfRangePositiveError;
                                   }
                                   if(measurements[i].value <= $scope.outOfRangeNegativeError){
                                    measurements[i].value = $scope.outOfRangeNegativeError
                                   }
                                }
                                
                                }
                                var svg = d3.select("#chart");
                                var margin = {top: 20, right: 95, bottom: 110, left: 105},
                                    margin2 = {top: 435, right: 50, bottom: 30, left: 105},
                                    width = +svg.attr("width") - margin.left - margin.right,
                                    height = +svg.attr("height") - margin.top - margin.bottom,
                                    height2 = +svg.attr("height") - margin2.top - margin2.bottom;
                                var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
                                measurements.forEach(function(d){
                                    d.value =+d.value;
                                    d.readingDate = parseDate(d.readingDate);
                                });

                                var x = d3.scaleTime().range([0, width]),
                                    x2 = d3.scaleTime().range([0, width]),
                                    y = d3.scaleLinear().range([height, 0]),
                                    y2 = d3.scaleLinear().range([height2, 0]);

                                var xAxis = d3.axisBottom(x)
                                               .tickSize(-height)
                                               .tickPadding(10),
                                    xAxis2 = d3.axisBottom(x2),
                                    yAxis = d3.axisLeft(y)
                                              .tickSize(-width)
                                              .tickPadding(10);

                                var brush = d3.brushX()
                                    .extent([[0, 0], [width, height2]])
                                    .on("brush end", brushed);

                                var zoom = d3.zoom()
                                    .scaleExtent([1, 400000])
                                    .translateExtent([[0, 0], [width, height]])
                                    .extent([[0, 0], [width, height]])
                                    .on("zoom", zoomed);

                                var line = d3.line()
                                    .x(function (d) { return x(d.readingDate); })
                                    .y(function (d) { return y(d.value); });

                                var line2 = d3.line()
                                    .x(function (d) { return x2(d.readingDate); })
                                    .y(function (d) { return y2(d.value); });

                                var clip = svg.append("defs").append("svg:clipPath")
                                    .attr("id", "clip")
                                    .append("svg:rect")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("x", 0)
                                    .attr("y", 0);
                                var Line_chart = svg.append("g")
                                    .attr("class", "focus")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                    .attr("clip-path", "url(#clip)")

                                var focus = svg.append("g")
                                    .attr("class", "focus")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                                var context = svg.append("g")
                                    .attr("class", "context")
                                    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
                                x.domain(d3.extent(measurements, function(d) {return d.readingDate; }));
                                y.domain([d3.min(measurements, function(d){ return d.value-2}), 
                                    d3.max(measurements, function (d) { return d.value +20; })]);                                
                                x2.domain(x.domain());
                                y2.domain(y.domain());
                                focus.append("g")
                                    .attr("class", "axis axis--x")
                                    .attr("transform", "translate(0," + height + ")")
                                    .call(xAxis);

                                focus.append("g")
                                    .attr("class", "axis axis--y")
                                    .call(yAxis);

                                Line_chart.append("path")
                                    .datum(measurements)
                                    .attr("class", "line")
                                    .attr("d", line);

                                context.append("path")
                                    .datum(measurements)
                                    .attr("class", "line")
                                    .attr("d", line2);

                                context.append("g")
                                    .attr("class", "axis axis--x")
                                    .attr("transform", "translate(0," + height2 + ")")
                                    .call(xAxis2);

                                context.append("g")
                                    .attr("class", "brush")
                                     .call(brush)
                                     .call(brush.move, x.range());

                                svg.append("rect")
                                    .attr("class", "zoom")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                    .call(zoom);

                                function showValues(value) {
                                    if( value == true){
                                    //show tooltips
                                            Line_chart.selectAll(".dot")
                                                .style("display", null)
                                                .data(measurements)
                                                .enter()
                                                .append("circle")
                                                .attr("class", "dot")
                                                .attr("r", 4)
                                                .style("fill", function(d){
                                                                        if(SENSOR_TYPE.ID == 37 || $scope.vibrations)
                                                                            {return "#d9534f";}
                                                                        else if (d.value>=$scope.outOfRangePositiveError || d.value <= $scope.outOfRangeNegativeError) 
                                                                            {return "#286090";}
                                                                        else if (d.value==0)
                                                                            {return "#d9534f";}
                                                                    
                                                                })
                                                .attr("cx", function(d) {return x(d.readingDate); })
                                                .attr("cy", function(d) {return y(d.value); })
                                            Line_chart.selectAll("text")
                                                .style("display", null)
                                                .data(measurements)
                                                .enter()
                                                .append("text")
                                                .attr("x", function(d) {return x(d.readingDate); })
                                                .attr("y", function(d) {return y(d.value)-3; })
                                                .text(function(d) { 
                                                                    if(d.value<$scope.outOfRangePositiveError && d.value >$scope.outOfRangeNegativeError && d.value!=0 && (!$scope.vibrations || SENSOR_TYPE.ID != 37)){return d.value;} 
                                                                    if(SENSOR_TYPE.ID == 37 || $scope.vibrations){
                                                                        if(d.value == 100){
                                                                            return 'x';
                                                                        } else{
                                                                            if(d.value == 200){
                                                                                return 'y';
                                                                            } else if(d.value == 300){
                                                                                return 'z';
                                                                            } else if(d.value == 400){
                                                                                return 'xy';
                                                                            } else if(d.value == 500){
                                                                                return 'xz';
                                                                            } else if(d.value == 600){
                                                                                return 'yz';
                                                                            }else if(d.value == 700){
                                                                                return 'xyz';
                                                                            }
                                                                        }
                                                                    }
                                                                    })
                                                inf.style("opacity", 0)
                                    }
                                    else{
                                        //hide tooltips
                                        Line_chart.selectAll(".dot")
                                               .style("display", "none");
                                        Line_chart.selectAll("text")
                                               .style("display", "none");
                                        inf.style("opacity", 0)

                                    }
                                }

                            //slider
                                svg.append("foreignObject")
                                    .attr("height", 80)
                                    .attr("width", 90)
                                    .attr("x", 100)
                                    .attr("y", 25)
                                    .append("xhtml:body")
                                    .html("<label id=slider><input type=checkbox id=chartChecked ><span id=sliderRound></span></label><div id=text title=Show values on chart.>Show values</div> ")
                                    
                                var inf = svg.select("#text")
                                    .attr("class", "checkbox-inline-a")
                                    .style("opacity", 0)
                                svg.select("#slider")
                                    .attr("class", "checkbox-inline switch")
                                    .on("mouseout", function(){
                                        inf
                                            .style("opacity", 0)
                                    })
                                    .on("mouseover", function(){
                                        inf
                                            .style("opacity", 1)
                                            .style("padding", 10)
                                    })
                                svg.select("#chartChecked")
                                    .attr("value", "value")
                                    .on("click", function(d, i){
                                        functionColorRound();
                                        showValues(svg.select("#chartChecked").node().checked)
                                    })
                                svg.select("#sliderRound")
                                    .attr("class", "slider round")
                                    .on("click", functionColorRound)
                                    

                            //legend
                                if((SENSOR_TYPE.ID != 37 && SENSOR_TYPE.ID !=0)|| !$scope.vibrations){
                                    var legend = svg.append("g")
                                                .attr("class", "legend")
                                                .attr("x", 880)
                                                .attr("y", 15)
                                                .attr("height", 100)
                                                .attr("width", 150)

                                    legend.selectAll("g")
                                                .data(measurements)
                                                .enter()
                                                .append("g")
                            //value legend
                                    legend.append("circle")
                                        .attr("cx", 650)
                                        .attr("cy", 10)
                                        .attr("r", 6)
                                        .style("fill","#4e9a06");
                                    legend.append("text")
                                        .attr("x", 660)
                                        .attr("y", 13)
                                        .attr("height", 30)
                                        .attr("width", 100)
                                        .style("fill", "#4e9a06")
                                        .text("Value")
                            //error legend
                                    legend.append("circle")
                                        .attr("cx", 700)
                                        .attr("cy", 10)
                                        .attr("r", 6)
                                        .style("fill","#d9534f");
                                    legend.append("text")
                                        .attr("x", 710)
                                        .attr("y", 13)
                                        .attr("height", 30)
                                        .attr("width", 100)
                                        .style("fill", "#d9534f")
                                        .text("Invalid sensor (0)")
                                    legend.append("circle")
                                        .attr("cx", 800)
                                        .attr("cy", 10)
                                        .attr("r", 6)
                                        .style("fill","#286090");
                                    legend.append("text")
                                        .attr("x", 810)
                                        .attr("y", 13)
                                        .attr("height", 30)
                                        .attr("width", 100)
                                        .style("fill", "#286090")
                                        .text("Out of range")

                                }
                                function brushed() {
                                        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
                                        var s = d3.event.selection || x2.range();
                                        x.domain(s.map(x2.invert, x2));
                                        Line_chart.select(".line").attr("d", line);
                                        Line_chart.selectAll(".dot")
                                            .attr("cx", function(d) {return x(d.readingDate); })
                                            .attr("cy", function(d) {return y(d.value); })
                                        Line_chart.selectAll("text")
                                            .attr("x",function(d) {return x(d.readingDate); })
                                            .attr("y", function(d) {return y(d.value)-3; })
                                        focus.select(".axis--x").call(xAxis);
                                         svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                                            .scale(width / (s[1] - s[0]))
                                            .translate(-s[0], 0));
                                        }

                                function zoomed() {
                                    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
                                    var t = d3.event.transform;
                                    x.domain(t.rescaleX(x2).domain());
                                    Line_chart.select(".line").attr("d", line);
                                    Line_chart.selectAll(".dot")
                                        .attr("cx", function(d) {return x(d.readingDate); })
                                        .attr("cy", function(d) {return y(d.value); })
                                    Line_chart.selectAll("text")
                                            .attr("x",function(d) {return x(d.readingDate); })
                                            .attr("y", function(d) {return y(d.value)-3; })
                                    focus.select(".axis--x").call(xAxis);
                                    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
                                }

                                function type(d) {
                                    d.readingDate = parseDate(d.readingDate);
                                    d.value = +d.value;
                                    return d;
                                }
        }
            }
        }
    }
    });
}());
