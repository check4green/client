(function () {
    "use strict";
angular.module("sensorApp")
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
            return $http.post('http://swiss-iot.azurewebsites.net/api/sensor-types/',values)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        function deleteType(key){
            return $http.delete('http://swiss-iot.azurewebsites.net/api/sensor-types/'+key.id)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        function updateType(key){
            return $http.put('http://swiss-iot.azurewebsites.net/api/sensor-types/'+key.id)
            .then(TypeSuccess)
            .catch(TypeError);
        }
        
    }]);
    }());