(function () {
    "use strict";
angular.module("sensorApp")
.factory("measurementsService", ["$q", "$http",function measurementsService($q, $http){
        return{load: getMeasurements,
              byKey:getMeasurementsByKey};
        function getMeasurements(loadOptions){
            var params={
                page:loadOptions.skip/loadOptions.take,
                pageSize:loadOptions.take
            };
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/42/readings', {params:params})
            .then(sendResponseMeasurements)
            .catch(MeasurementError)
        }
        function sendResponseMeasurements(response){
           var pagingInfo=angular.fromJson(response.headers("X-Pagination"));
            var totalCount=response.data.length;
            if (pagingInfo){
                totalCount= pagingInfo.totalCount;
            }
            return {data:response.data, totalCount:totalCount};
        }
        
       function getMeasurementsByKey(key){
           return $http.get('http://swiss-iot.azurewebsites.net/api/measurements/'+key.id)
           .then(MeasurementSuccess)
           .catch(MeasurementError)
       }
        function MeasurementSuccess(response){
            return response.data;
        }
        function MeasurementError(response){
            return $q.reject('Error retrieving measurement(s) .(HTTP status:' +response.status + ')');
        }
        
    }]);
    }());