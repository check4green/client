(function(){
    "use strict";
angular.module("sensorApp")
.controller("typeCtrl",["typesService", function typeCtrl(typesService) {
    var vm=this;
   
            vm.dataGridOptions = {
                dataSource: typesService,
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
                        dataField: "code",
                    }, 
                    {
                        dataField: "description",
                    },
                    {
                        dataField: "minValue",
                    },   
                    {
                        dataField: "maxValue",
                    },  
                    
                    {
                        dataField:"measureId"
                    },
                    {
                        dataField: "multiplier",
                    }
                ],
            };
       
    }]);
}());    