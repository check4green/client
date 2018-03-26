(function(){
    "use strict";
angular.module("sensorApp")
.controller("typeCtrl",["typesResource", function typeCtrl(typesResource) {
    var vm=this;
    vm.title = 'SENSOR TYPES';
    typesResource.query(function(data){
            vm.types=data;
            vm.dataGridOptions = {
                dataSource: vm.types,
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
                        dataField: "multiplier",
                    },  
                ],
            };
        });
    }]);
}());    