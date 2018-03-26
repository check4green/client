(function(){
    "use strict";
    angular.module("sensorApp")
           .controller("MeasurementsCtrl", ["measurementsService", function MeasurementsCtrl(measurementsService){
        var vm= this;
          
        vm.measurementsDataGrid = {
                dataSource: measurementsService,
                showRowLines: true,
                showBorders: true,
            remoteOperations: {
            sorting: true,
            paging: true
        },
                paging: {
                    pageSize:2,
                },
                editing: {
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true
                }, 
                columns: [
                    {
                        dataField:"id",
                    },
                    {
                        dataField: "unitOfMeasure",
                    },
                    {
                        dataField: "description",
                    }
                    
                ],
            };
       
     }]);
}());