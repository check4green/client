(function(){
    "use strict";
   angular.module("sensorApp")
   .controller("sensorCtrl",["sensorsService", function sensorsCtrl(sensorsService) {
       var vm=this;
       vm.title = 'SENSOR LIST';
       
        vm.dataGridOptions = {
                dataSource: sensorsService,
                showRowLines: true,
                showBorders: true,
                paging: {
                    enabled:true
                },
               searchPanel:{
                    visible:true
               } ,
                editing: {
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true
                }, 
                masterDetail: {
                    enabled: true,
                    template: "detail"
                }, 
                // selection: {
                //     mode: "single",
                //     template: "detail"
                // },
                columns: [
                    {
                        dataField: "productionDate",
                        dataType: "date"
                    }, 
                    {
                        dataField: "uploadInterval",
                    },
                    {
                        dataField: "Name"
                    },  
                ],
                onSelectionChanged: function (selectedItems) {
                        vm.selectedGrid = selectedItems.selectedRowsData[0];
                    }
            };
        
    }]);
    
}());


