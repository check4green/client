(function () {
    "use strict";
angular.module("sensorApp")
.factory("measurementsService", ["$q", "$http",function measurementsService($q, $http){
        return{load: getMeasurements,
              byKey:getMeasurementsByKey,
              insert:insertMeasurement,
              remove:deleteMeasurement,
              update:updateMesurement};
        function getMeasurements(loadOptions){
            var params={
                page:loadOptions.skip/loadOptions.take,
                pageSize:loadOptions.take
            };
            return $http.get('http://swiss-iot.azurewebsites.net/api/measurements', {params:params})
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
        function insertMeasurement(values){
            return $http.post('http://swiss-iot.azurewebsites.net/api/measurements/',values)
            .then(MeasurementSuccess)
            .catch(MeasurementError);
        }
        function deleteMeasurement(key){
            return $http.delete('http://swiss-iot.azurewebsites.net/api/measurements/'+key.id)
            .then(MeasurementSuccess)
            .catch(MeasurementError);
        }
        function updateMesurement(key, values){
            return $http.put('http://swiss-iot.azurewebsites.net/api/measurements/'+key.id,key)
            .then(UpdateSuccess)
            .catch(MeasurementError);
        }
    function UpdateSuccess(response){
        return response.config.data;
    }
    }]);
    }());