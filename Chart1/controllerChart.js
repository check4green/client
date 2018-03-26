(function(){
    "use strict";
    var chartApp = angular.module('sensorApp');
    
    chartApp.controller("chartCtrl",["chartResource" ,function chartCtrl(chartsResource) {
        var vm=this;
        chartsResource.query(function (data){
            vm.charts=data;
            
            vm.chartOptions = {
                dataSource: vm.charts,
               
                commonSeriesSettings: {
                    argumentField: "hours",
                    label:{
                        visible:true}
                },
                argumentAxis: {
                    valueMarginsEnabled: false,
                    discreteAxisDivisionMode: "crossLabels",
                    
                    grid: {
                        visible: true
                    }
                },
                series: [
                    { valueField: "value"},
                    { valueField: "grade"}
                ],
                title: { 
                    text: "Sensor chart",
                },
                scrollBar: {
                    visible: true
                },
                scrollingMode: "all", 
                zoomingMode: "all",
                legend:{
                    visible:false
                },
                width: '100%'
            };
        }) 
    }]);
}());