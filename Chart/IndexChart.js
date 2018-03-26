var chartApp = angular.module('chartApp', ['dx']);

chartApp.controller("chartController",["chartService" ,function chartController(chartService) {
  var vm=this;
   
                                                                         
    vm.chartOptions = {
        dataSource: chartService,
        commonSeriesSettings: {
            argumentField: "days",
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
            text: "Sensor temperature °C",
        },
        legend:{
            visible:false
        },
        
    };
    
}]);
