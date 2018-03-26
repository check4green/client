(function(){
    "use strict";
    angular.module("sensorApp")
           .controller("dashboardCtrl", ["dashboardsService", function dashboardCtrl(dashboardsService){
        var vm= this;
             
        vm.dashboardDataGrid = {
                dataSource: dashboardsService,
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
                        dataField: "sensors",
                    }   
                ],
            };
        
     }]);
}());