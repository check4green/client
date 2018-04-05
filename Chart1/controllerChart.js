(function(){
    "use strict";
    angular.module('sensorApp')
    
   .controller("chartCtrl",["chartService" ,function chartCtrl(chartService) {
        var vm=this;
        
            
            vm.chartOptions = {
                dataSource: chartService,
               
                commonSeriesSettings: {
                    argumentField: "readingDate",
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
                    { valueField: "value"}
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
       
    }]);
}());