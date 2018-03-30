(function () {
    "use strict";
    angular.module("common.services")
    
    .factory("typesResource" , ["$resource", function typesResource($resource){
        return $resource("/api/types/:typeId")
          }])
    
    .factory("measureResource", ["$resource", function measureResource($resource){
        return $resource("/api/measurements/:measureId")
          }])
    
    .factory("sensorsResource", ["$resource", function sensorsResource($resource){
        return $resource("/api/sensors/:ID")
    }])
    
     .factory("dashboardResource" , ["$resource", function dashboardResource($resource){
        return $resource("/api/dashboards/:dashboardId")
          }])
    
    .factory("chartResource", ["$resource", function chartResource($resource){
        return $resource("/api/charts/:chartsID")
    }])
    
}());