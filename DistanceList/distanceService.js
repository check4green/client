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
        getSensorById: getSensorById
    }   
     function  getSensors(pag){
    return $http.get("http://swiss-iot.azurewebsites.net/api/sensor-types/33/sensors?page=" + pag + "&pageSize=30")
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
       function updateSensors(newSensor, id){
           return $http.put("http://swiss-iot.azurewebsites.net/api/sensors/"+id, newSensor)
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
       function getMeasurements(id){
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/' + id + '/readings')
           .then(measurementsSuccess)
           .catch(measurementsError);
       }
       function measurementsSuccess(response){
           return response.data;
       }
       function measurementsError(response){
           return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
       }
       function getSensorById(id){
           return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/' +id)
           .then(function(response){
               return response.data;
           })
       }
   })
}());