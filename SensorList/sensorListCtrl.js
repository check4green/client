(function(){
    "use strict";
   angular.module("sensorApp")
   .controller("sensorCtrl",["sensorsResource", function sensorsCtrl(sensorsResource) {
       var vm=this;
       vm.title = 'SENSOR LIST';
       sensorsResource.query(function (data){
        vm.sensors=data;
        vm.dataGridOptions = {
                dataSource: vm.sensors,
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
                        dataField: "productionDate",
                        dataType: "date"
                    }, 
                    {
                        dataField: "uploadInterval",
                    },
                    {
                        dataField: "Name",
                    },  
                ],
            };
        });
    }]);
}());