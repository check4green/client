(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.factory("distanceService", function (SENSOR_TYPE, $http, $q) {
    return{
        getSensors:getSensors,
        insertSensors:insertSensors,
        updateSensors:updateSensors,
        deleteSensors:deleteSensors,
        getMeasurements: getMeasurements,
        getSensorByAddress: getSensorByAddress,
        getFinalPage: getFinalPage,
        getAllReadings: getAllReadings,
        getPageFinal: getPageFinal,
        getFinalPageReadings: getFinalPageReadings,
        getAllSensors: getAllSensors
    } 
       function getPageFinal(gatewayAddress, clientAddress){
           return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=1&pageSize=10')
        //    return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=1&pageSize=10')
           .then(function(response){
               return response.headers('X-Tracker-Pagination-PageCount')
           })
       }
       function getAllReadings(pageSize){
           return $http.get('http://192.168.0.18:32333/api/sensors/46/readings?page=1&pageSize='+pageSize)
        //    return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/46/readings?page=1&pageSize='+pageSize)
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPage(){
           return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=1&pageSize=30')
        //    return  $http.get('http://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=1&pageSize=30')
             .then(function (response){
                return response.headers('X-Tracker-Pagination-PageCount');
           })
       }
       function  getSensors(pag){
            return $http.get("http://192.168.0.18:32333/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + pag + "&pageSize=30")
            // return $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + pag + "&pageSize=30")
            .catch(getError);
     }
       function sensorsSuccess(response){
           return response.data;
       }
       function getError(response){
           return $q.reject('Error retriving sensor(s).(HTTP status:' +response.status + ')');
       }
        function getAllSensors(){
               return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=1&pageSize=30')
            //  return  $http.get('http://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=1&pageSize=30')
                .then(function (response){
                    return response.headers('X-Tracker-Pagination-SensorCount');
                })
        }
       function insertSensors(sensor){
           return $http.post("http://192.168.0.18:32333/api/sensors", sensor)
        //    return $http.post("http://swiss-iot.azurewebsites.net/api/sensors", sensor)
                .then(sensorsSuccess)
                .catch(insertError);
       }
       function insertError(response){
           return $q.reject('Error registering sensor(s).(HTTP status:' +response.status + ')');
       }
       function updateSensors(newSensor, gatewayAdress, clientAddress){
           return $http.put("http://192.168.0.18:32333/api/sensors/address/"+gatewayAdress +"/"+clientAddress, newSensor)
        //    return $http.put("http://swiss-iot.azurewebsites.net/api/sensors/address/"+gatewayAdress +"/"+clientAddress, newSensor)
           .catch(updateError);
       }
       function updateError(response){
           return $q.reject('Error updating sensor(s).(HTTP status:' +response.status + ')');
       }
       function deleteSensors(gatewayAddress, clientAddress){
           return $http.delete("http://192.168.0.18:32333/api/sensors/address/" + gatewayAddress + "/" + clientAddress)
        //    return $http.delete("http://swiss-iot.azurewebsites.net/api/sensors/address/" + gatewayAddress + "/" + clientAddress)
           .then(sensorsSuccess)
           .catch(deleteError);
       }
       function deleteError(response){
           return $q.reject('Error deleting sensor(s).(HTTP status:' +response.status + ')');
       }
       function getMeasurements(gatewayAddress, clientAddress, page, pageSize){
           return $http.get('http://192.168.0.18:32333/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+ page +'&pageSize='+ pageSize)
        //    return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+page +'&pageSize='+ pageSize)
           .then(measurementsSuccess)
           .catch(measurementsError)
       }
       function measurementsSuccess(response){
           return response.data;
       }
       function measurementsError(response){
           return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
       }
       function getSensorByAddress( gatewayAddress, clientAddress){
           return $http.get('http://192.168.0.18:32333/api/sensors/address/' + gatewayAddress +'/'+ clientAddress)
        //    return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/' + gatewayAddress +'/'+ clientAddress)
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPageReadings(gatewayAddress, clientAdress){
           return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings')
        //    return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings')
           .then(function(response){
               return response.headers('X-Tracker-Pagination-SensorReadingsCount');
           })
       }
   })
}());