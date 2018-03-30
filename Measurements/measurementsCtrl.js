(function(){
    "use strict";
    angular.module("sensorApp")
           .controller("MeasurementsCtrl", ["measurementsService", function MeasurementsCtrl(measurementsService){
        var vm= this;
        vm.title = 'MEASUREMENTS';       
       
        vm.measurementsDataGrid = {
                dataSource: measurementsService,
                showRowLines: true,
                showBorders: true,
                paging: {
                    enabled: true
                },
                editing: {
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true
                }, 
                columns: [
                    {
                        dataField: "TimeH/Day",
                    },
                    {
                        dataField: "Value °C",
                    }     
                ],
            };
        
     }]);
}());