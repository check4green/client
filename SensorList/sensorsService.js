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
            
       function getSensorsById(key){
         
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/'+ key)
            .then(SensorSuccess)
            .catch(SensorError);
        }
            function SensorSuccess(response){
                
                return{data: response.data};
            }
            
            //insert
            
            function insertSensors(values)
            {
               
                return $http.post('http://swiss-iot.azurewebsites.net/api/sensors', values)
                .then(SensorSuccess)
                .catch(SensorError);
            }
           
            //remove
            
            
            function deleteSensors(key){
                
                return $http.delete('http://swiss-iot.azurewebsites.net/api/sensors/'+key.id)
                    .then(SensorSuccess)
                    .catch(SensorError);
            }
            
            //update
            
            function updateSensors(key, values){
                return $http.put( 'http://swiss-iot.azurewebsites.net/api/sensors/'+key.id)
                .then(SensorSuccess)
                .catch(SensorError);
            }
            
    }])
    
    .factory("measurementsService", ["$q", "$http",function measurementsService($q, $http){
        return{load: getMeasurements,
              byKey:getMeasurementsByKey,
              insert:insertMeasurements,
              remove:deleteMeasurements,
              update:updateMesurements};
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
           return $http.get('http://swiss-iot.azurewebsites.net/api/measurements/'+key)
           .then(MeasurementSuccess)
           .catch(MeasurementError)
       }
        function MeasurementSuccess(response){
            return {data:response.data};
        }
        function MeasurementError(response){
            return $q.reject('Error retrieving measurement(s) .(HTTP status:' +response.status + ')');
        }
        function insertMeasurements(values){
            return $http.post('http://swiss-iot.azurewebsites.net/api/measurements/', values)
            .then(MeasurementSuccess)
            .catch(MeasurementError);
        }
        function deleteMeasurements(key){
            return $http.delete('http://swiss-iot.azurewebsites.net/api/measurements/'+key)
            .then(MeasurementSuccess)
            .catch(MeasurementError);
        }
        function updateMesurements(key){
            return $http.put('http://swiss-iot.azurewebsites.net/api/measurements/', key.Id)
            .then(MeasurementSuccess)
            .catch(MeasurementError);
        }
       
    }])
    
    .factory("typesService", ["$q", "$http",function typesService($q, $http){
                              return{load: getTypes,
                                    byKey:getTypeByKey,
                                    insert:insertType,
                                    remove:deleteType,
                                    update:updateType};
        function getTypes(loadOptions){
             var params={page:loadOptions.skip/loadOptions.take, pageSize:loadOptions.take}
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensor-types', {params:params})
            .then(sendResponseTypes)
            .catch(TypeError)
        }
        function sendResponseTypes(response){
            var pagingInfo=angular.fromJson(response.headers("X-Pagination"));
            var totalCount=response.data.length;
            if (pagingInfo){
                totalCount= pagingInfo.totalCount;
            }
            return {data:response.data, totalCount:totalCount};
        }
        function TypeError(response){
            return $q.reject('Error retrieving type(s) .(HTTP status:' +response.status + ')');
        }
        function getTypeByKey(key){
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensor-types'+key)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        function TypeSuccess(response){
            return{data:response.data};
        }
        function insertType(values){
            return $http.post('http://swiss-iot.azurewebsites.net/api/sensor-types', values)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        function deleteType(key){
            return $http.delete('http://swiss-iot.azurewebsites.net/api/sensor-types', key)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        function updateType(key){
            return $http.put('http://swiss-iot.azurewebsites.net/api/sensor-types', key.Id)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        
    }])
    
    
    .factory("dashboardsService", ["$q", "$http",function dashboardsService($q, $http){
        return {load: getDashboards};
        function getDashboards(loadOptions){
            var params={page:loadOptions.skip/loadOptions.take, pageSize:loadOptions.take};
            return $http.get('/api/dashboards', {params:params})
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