(function(){
    "use strict";
    angular.module("sensorApp")
           .controller("MeasurementsCtrl", ["measureResource", function MeasurementsCtrl(measureResource){
        var vm= this;
        vm.title = 'MEASUREMENTS';       
        measureResource.query(function (data) {
        vm.measurements = data;
        vm.measurementsDataGrid = {
                dataSource: vm.measurements,
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
        });
     }]);
}());