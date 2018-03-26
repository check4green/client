(function(){
    "use strict";
   angular.module("sensorApp")
   .controller("sensorCtrl",["sensorsService", function sensorsCtrl(sensorsService) {
       var vm=this;
      
        vm.dataGridOptions = {
                dataSource: sensorsService,
                showRowLines: true,
                showBorders: true,
            remoteOperations: {
            sorting: true,
            paging: true
        },
                paging: {
                pageSize:2
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
                        dataField: "productionDate",
                        dataType: "date"
                    }, 
                    {
                        dataField: "uploadInterval",
                    },
                    {
                        dataField: "batchSize",
                    },  
                    {
                        dataField:"sensorTypeId",
                    },
                ],
            };
        
    }]);
}());