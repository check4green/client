(function(){
    "use strict";
    angular.module("sensorApp")
           .controller("dashboardCtrl", ["dashboardResource", function 
           dashboardCtrl(dashboardsResource){
        var vm = this;
        vm.title = 'DASHBOARD';  
            
        vm.sensorSelected = function(a){
           a.component.collapseAll(-1);
                a.component.expandRow(a.currentSelectedRowKeys[1]);
            },
                 
        dashboardsResource.query(function (data) {
        vm.dashboards = data;
        vm.dashboardDataGrid = {
                dataSource: vm.dashboards,
                showRowLines: true,
                showBorders: true,
                paging: {
                    enabled: true
                },
           
            
             onSelectionChanged: vm.sensorSelected,
             keyExpr: "dashboardId",
            
     
            
                editing: {
                    allowDeleting: true,
                    allowAdding: true
                }, 
            masterDetail: {
            enabled: true,
            template: "detail"
        },/*<chart></chart>*/
                columns: [
                    {
                        dataField: "sensorId"
                    }   
                ],
            };
        });
     }]);
}());
      /*  selection:{
                    mode: 'single',
                },
           onSelectionChanged: function(i){
                i.component.collapseAll(-1);
                i.component.expandRow(i.currentSelectedRowKeys[0]);
            },
            onContentReady: function(i){
              if(!i.component.getSelectedRowKeys().length)
                  i.component.selectRowsByIndexes(0);
            },*/