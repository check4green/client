    var app = angular.module('sensorApp');
    app.directive('chartd3', function(){
        return {
        restrict: 'E',
        templateUrl: 'SensorModel/chartDirectiveView.html',
        controller: function chartd3Ctrl(sensorModelService, d3, $scope){
                    var readings = 1000;
                    $scope.chartButton = true;
                    $scope.chartDisplay = false;
                $scope.chart = function(gatewayAddress, clientAddress){
                    var page = 0
                    $scope.value = false;
                    $scope.chartDisplay = true;
                    $scope.chartButton = false;
                    $scope.detailsDisplay = false;
                    $scope.measurementsButton = false;
                    $scope.deleteButton = false;
                    $scope.editButton = false;
                    $scope.noDataChart = false;
                    $scope.loadingChart = true;
                    $scope.dataChart = false;
                    d3.selectAll("svg > *").remove();
                    sensorModelService.getMeasurements(gatewayAddress, clientAddress, page, readings)
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
                               for (var i=0; i<measurements.length; i++){
                                   measurements[i].readingDate = measurements[i].readingDate.substr(0, 10)+" " +measurements[i].readingDate.substr(11, 8);
                                   if(measurements[i].value >$scope.outOfRangeError){
                                       measurements[i].value = $scope.outOfRangeError;
                                   }
                               }
                                var svg = d3.select("svg")
                                            .attr("id", "svgId");
                                var margin = {top: 20, right: 90, bottom: 110, left: 100},
                                    margin2 = {top: 430, right: 50, bottom: 30, left: 100},
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
                                x.domain(d3.extent(measurements, function(d) { return d.readingDate; }));
                                y.domain([0, d3.max(measurements, function (d) { return d.value +10; })]);
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

                                $scope.showValues = function(value) {
                                    if( value == true){
                                    //show tooltips
                                            Line_chart.selectAll(".dot")
                                                .style("display", null)
                                                .data(measurements)
                                                .enter()
                                                .append("circle")
                                                .attr("class", "dot")
                                                .attr("r", 4)
                                                .style("fill", function(d){if (d.value>=$scope.outOfRangeError) {return "#286090";}
                                                                      else{if (d.value==0){return "#d9534f";}}})
                                                .attr("cx", function(d) {return x(d.readingDate); })
                                                .attr("cy", function(d) {return y(d.value); })
                                            Line_chart.selectAll("text")
                                                .style("display", null)
                                                .data(measurements)
                                                .enter()
                                                .append("text")
                                                .attr("x", function(d) {return x(d.readingDate); })
                                                .attr("y", function(d) {return y(d.value)-3; })
                                                .text(function(d) { if(d.value<$scope.outOfRangeError && d.value!=0){return d.value;} })
                                    }
                                    else{
                                        //hide tooltips
                                        Line_chart.selectAll(".dot")
                                               .style("display", "none");
                                        Line_chart.selectAll("text")
                                                .style("display", "none");
                                    }
                                }

                            //legend
                                var legend = svg.append("g")
                                                .attr("class", "legend")
                                                .attr("x", 880)
                                                .attr("y", 25)
                                                .attr("height", 100)
                                                .attr("width", 100)

                                legend.selectAll("g")
                                                .data(measurements)
                                                .enter()
                                                .append("g")
                            //value legend
                                legend.append("circle")
                                      .attr("cx", 880)
                                      .attr("cy", 30)
                                      .attr("r", 6)
                                      .style("fill","#4e9a06");
                                legend.append("text")
                                     .attr("x", 890)
                                     .attr("y", 33)
                                     .attr("height", 30)
                                     .attr("width", 100)
                                     .style("fill", "#4e9a06")
                                     .text("Value")
                            //error legend
                                legend.append("circle")
                                      .attr("cx", 880)
                                      .attr("cy", 50)
                                      .attr("r", 6)
                                      .style("fill","#d9534f");
                                legend.append("text")
                                     .attr("x", 890)
                                     .attr("y", 53)
                                     .attr("height", 30)
                                     .attr("width", 100)
                                     .style("fill", "#d9534f")
                                     .text("Invalid sensor (0)")
                                legend.append("circle")
                                        .attr("cx", 880)
                                        .attr("cy", 69)
                                        .attr("r", 6)
                                        .style("fill","#286090");
                                legend.append("text")
                                        .attr("x", 890)
                                        .attr("y", 70)
                                        .attr("height", 30)
                                        .attr("width", 100)
                                        .style("fill", "#286090")
                                        .text("Out of range")


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

            $scope.cancelChart = function(){
                $scope.chartDisplay = false;
                $scope.chartButton = true;
                $scope.editButton = true;
                $scope.detailsDisplay = true;
                $scope.deleteButton = true;
                $scope.measurementsButton = true;
            }
        }
    }
    })
