(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.factory("distanceService", function ($http, $q) {
    return{
        getSensors:getSensors,
        insertSensors:insertSensors,
        updateSensors:updateSensors,
        deleteSensors:deleteSensors,
        getMeasurements: getMeasurements,
        getSensorById: getSensorById,
        getFinalPage: getFinalPage,
        getAllReadings: getAllReadings,
        getPageFinal: getPageFinal,
        getFinalPageReadings: getFinalPageReadings
    } 
       function getPageFinal(){
           return $http.get('http://192.168.0.18:32333/api/sensors/65/readings?page=0&pageSize=50')
           .then(function(response){
               return response.headers('X-Tracker-Pagination-PageCount')
           })
       }
       function getAllReadings(pageSize){
           return $http.get('http://192.168.0.18:32333/api/sensors/65/readings?page=0&pageSize='+pageSize)
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPage(){
           return  $http.get('http://192.168.0.18:32333/api/sensors?page=0&pageSize=30')
             .then(function (response){
                return response.headers('X-Tracker-Pagination-PageCount');
           })
       }
       function  getSensors(pag){
            return $http.get("http://192.168.0.18:32333/api/sensors?page=" + pag + "&pageSize=30")
            .catch(getError);
     }
       function sensorsSuccess(response){
           return response.data;
       }
       function getError(response){
           return $q.reject('Error retriving sensor(s).(HTTP status:' +response.status + ')');
       }
       function insertSensors(sensor){
           return $http.post("http://swiss-iot.azurewebsites.net/api/sensors", sensor)
                .then(sensorsSuccess)
                .catch(insertError);
       }
       function insertError(response){
           return $q.reject('Error registering sensor(s).(HTTP status:' +response.status + ')');
       }
       function updateSensors(newSensor, gatewayAdress, clientAddress){
           return $http.put("http://swiss-iot.azurewebsites.net/api/sensors/address/"+gatewayAdress +"/"+clientAddress, newSensor)
           .catch(updateError);
       }
       function updateError(response){
           return $q.reject('Error updating sensor(s).(HTTP status:' +response.status + ')');
       }
       function deleteSensors(sensorId){
           return $http.delete("http://swiss-iot.azurewebsites.net/api/sensors/"+sensorId)
           .then(sensorsSuccess)
           .catch(deleteError);
       }
       function deleteError(response){
           return $q.reject('Error deleting sensor(s).(HTTP status:' +response.status + ')');
       }
       function getMeasurements(gatewayAddress, clientAddress, page, pageSize){
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
       function getSensorById( gatewayAddress, clientAddress){
           return $http.get('http://192.168.0.18:32333/api/sensors/' + gatewayAddress +'/'+ clientAddress)
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPageReadings(){
           return $http.get('http://192.168.0.18:32333/api/sensors/65/readings')
           .then(function(response){
               return response.headers('X-Tracker-Pagination-SensorReadingsCount');
           })
       }
   })
}());