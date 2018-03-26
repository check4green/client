(function () {
    "use strict";
angular.module("sensorApp")
        .factory( "sensorsService" , ["$q", "$http", function sensorsService($q, $http){
	
        return {load: getSensors,
               byKey:getSensorsById,
               insert:insertSensors,
               remove:deleteSensors,
               update:updateSensors};
            //load
            
        function getSensors(loadOptions){
            var params=
                {
                    page:loadOptions.skip/loadOptions.take,
                    pageSize:loadOptions.take
                };
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensors', {params:params})
                .then(sendGetSensor)
                .catch(SensorError)
        }
             function sendGetSensor(response){
                var pagingInfo=angular.fromJson(response.headers("X-Pagination"));
                var totalCount=response.data.length;
                if (pagingInfo){
                    totalCount=pagingInfo.totalCount;
                    }
            return {data:response.data, totalCount:totalCount};
        }
        function SensorError(response){
            return $q.reject('Error retrieving sensor(s) .(HTTP status:' +response.status + ')');
        }
            //byKey
            
       function getSensorsById(key)
            {
         return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/'+ key)
                .then(SensorSuccess)
                .catch(SensorError);
            }
            function SensorSuccess(response){
               return response.data;
            }
            
            //insert
            
            function insertSensors(values)
            {
              return $http.post('http://swiss-iot.azurewebsites.net/api/sensors/',values)
                    .then(SensorSuccess)
                    .catch(insertError);
            }
            function insertError(response){
                 return $q.reject('Error adding sensor(s) .(HTTP status:' +response.status + ')');
            }
           
            //remove
            function deleteSensors(key){
            return $http.delete('http://swiss-iot.azurewebsites.net/api/sensors/'+key.id)
            .then(SensorSuccess)
            .catch(deleteError);
        }
            function deleteError(response){
                return $q.reject('Error deleting sensor(s) .(HTTP status:' +response.status + ')');
            }
            //update
            
            function updateSensors(key, values)
            {
                return $http.put('http://swiss-iot.azurewebsites.net/api/sensors/'+ key.id,key)
                    .then(SensorSuccess)
                    .catch(updateError);
            }
          function updateError(response){
              return $q.reject('Error updating sensor(s) .(HTTP status:' +response.status + ')');
          }  
    }]);
}());