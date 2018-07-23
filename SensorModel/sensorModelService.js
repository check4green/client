(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.factory("sensorModelService", function (SENSOR_TYPE, $http, $q) {
    return{
        getSensors:getSensors,
        insertSensors:insertSensors,
        updateSensors:updateSensors,
        deleteSensors:deleteSensors,
        getMeasurements: getMeasurements,
        getSensorByAddress: getSensorByAddress,
        getFinalPage: getFinalPage,
        getPageFinal: getPageFinal,
        getFinalPageReadings: getFinalPageReadings,
        getAllSensors: getAllSensors,
        getMeasureId:getMeasureId,
        getUnitOfMeasure:getUnitOfMeasure
    }
       function getPageFinal(gatewayAddress, clientAddress ,size){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=0&pageSize=' + size)
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=0&pageSize=' + size)
           .then(function(response){
               return response.headers('X-Tracker-Pagination-PageCount')
           })
       }
       function getFinalPage(size, encodedData){
        //    return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=0&pageSize=' +size)
           return  $http({
             method: "GET",
             url:'http://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/users/sensors?page=0&pageSize=' +size,
             headers:{'Authorization' : 'Basic ' +encodedData}
           })
             .then(function (response){
                return response.headers('X-Tracker-Pagination-PageCount');
           })
       }
       function  getSensors(pag, size, encodedData){
            // return $http.get("http://192.168.0.18:32333/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + pag + "&pageSize=" + size)
            return $http({method: "GET",
            url:"http://swiss-iot.azurewebsites.net/api/sensor-types/"+ SENSOR_TYPE.ID +"/users/sensors?page=" + pag + "&pageSize=" + size,
            headers: {'Authorization': 'Basic '+ encodedData}
        })
            .catch(getError);
     }
       function sensorsSuccess(response){
           return response.data;
       }
       function getError(response){
           return $q.reject('Error retriving sensor(s).(HTTP status:' +response.status + ')');
       }
        function getAllSensors(size, encodedData){
            //    return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=0&pageSize=' + size)
             return  $http({
               method: "GET",
               url:'http://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/users/sensors?page=0&pageSize=' + size,
               headers: {'Authorization': 'Basic '+ encodedData }
            })
                .then(function (response){
                    return response.headers('X-Tracker-Pagination-SensorCount');
                })
        }
       function insertSensors(sensor,encodedData){
        //    return $http.post("http://192.168.0.18:32333/api/sensors", sensor)
           return $http({
             method:"POST",
             url:"http://swiss-iot.azurewebsites.net/api/sensors",
             data:sensor,
             headers: {'Authorization': 'Basic '+ encodedData}
           })
            .then(function (response){
                 return response.data;
        })
       }
       function updateSensors(newSensor, gatewayAdress, clientAddress, encodedData){
        //    return $http.put("http://192.168.0.18:32333/api/sensors/address/"+gatewayAdress +"/"+clientAddress, newSensor)
           return $http({
             method:"PUT",
             url: "http://swiss-iot.azurewebsites.net/api/sensors/address/"+gatewayAdress +"/"+clientAddress,
             data: newSensor,
             headers: {'Authorization': 'Basic '+ encodedData}
           })
           .then(function (response){
                return response.data;
            })
        }
       function deleteSensors(gatewayAddress, clientAddress, encodedData){
        //    return $http.delete("http://192.168.0.18:32333/api/sensors/address/" + gatewayAddress + "/" + clientAddress)
           return $http({
             method:"DELETE",
             url:"http://swiss-iot.azurewebsites.net/api/sensors/address/" + gatewayAddress + "/" + clientAddress,
             headers: {'Authorization' :'Basic ' + encodedData}
           })
           .then(sensorsSuccess)
           .catch(deleteError);
       }
       function deleteError(response){
           return $q.reject('Error deleting sensor(s).(HTTP status:' +response.status + ')');
       }
       function getMeasurements(gatewayAddress, clientAddress, page, pageSize){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+ page +'&pageSize='+ pageSize)
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+page +'&pageSize='+ pageSize)
           .then(measurementsSuccess)
           .catch(measurementsError)
       }
       function measurementsSuccess(response){
           return response.data;
       }
       function measurementsError(response){
           return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
       }
       function getMeasureId(){
        // return $http.get('http://192.168.0.18:32333/api/sensor-types/'+ SENSOR_TYPE.ID)
        return $http.get('http://swiss-iot.azurewebsites.net/api/sensor-types/'+ SENSOR_TYPE.ID)
             .then(function(response){
               return response.data;
             })
      }
      function getUnitOfMeasure(measureId){
        // return $http.get('http://192.168.0.18:32333/api/measurements/'+ measureId)
        return $http.get('http://swiss-iot.azurewebsites.net/api/measurements/'+ measureId)
           .then(function(response){
             return response.data;
           })
      }
       function getSensorByAddress( gatewayAddress, clientAddress){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/' + gatewayAddress +'/'+ clientAddress)
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/' + gatewayAddress +'/'+ clientAddress)
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPageReadings(gatewayAddress, clientAdress){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings')
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings')
           .then(function(response){
               return response.headers('X-Tracker-Pagination-SensorReadingsCount');
           })
       }
   })
}());
