(function () {
    "use strict";
angular.module("sensorApp")
.factory("dashboardsService", ["$q", "$http",function dashboardsService($q, $http){
        return {load: getDashboards};
        function getDashboards(loadOptions){
            var params={page:loadOptions.skip/loadOptions.take, pageSize:loadOptions.take};
            return $http.get('http://swiss-iot.azurewebsites.net/api/users/1/sensors', {params:params})
            .then(sendResponseDashboards)
            .catch(sendGetDashboardsError)
        }
        function sendResponseDashboards(response){
            var pagingInfo=angular.fromJson(response.headers("X-Pagination"));
            var totalCount=response.data.length;
            if (pagingInfo){
                totalCount= pagingInfo.totalCount;
            }
            return {data:response.data, totalCount:totalCount};
        }
        function sendGetDashboardsError(response){
            return $q.reject('Error retrieving dashboards .(HTTP status:' +response.status + ')');
        }
    }]);
    }());