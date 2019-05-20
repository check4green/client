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
        getFinalPage: getFinalPage,
        
        getFinalPageReadings: getFinalPageReadings,
        getAllSensors: getAllSensors,
        getMeasureId:getMeasureId,
        getUnitOfMeasure:getUnitOfMeasure,
        getSensorsById: getSensorsById,
        getGateway: getGateway
    }
       
       function getSensorsById(encodedData, networkId, id ){
           return $http({
                method: "GET",
                //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/'+id,
                url:'https://swiss-iot.azurewebsites.net/api/networks/'+ networkId +'/sensors/'+ id,
                headers:{'Authorization' : 'Basic ' +encodedData}

         })
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPage(encodedData, networkId, size){
           return  $http({
             method: "GET",
             //url: 'http://192.168.0.18:32332/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page=0&pagesize='+size,
             url:'https://swiss-iot.azurewebsites.net/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page=0&pageSize='+size,
             headers:{'Authorization' : 'Basic ' +encodedData}
           })
             .then(function (response){
                return response.headers('X-Tracker-Pagination-TotalCount');
           })
       }
       function  getSensors(encodedData, networkId, pag, size ){
            return $http({method: "GET",
            //url: 'http://192.168.0.18:32332/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page='+pag+'&pageSize='+size,
            url:'https://swiss-iot.azurewebsites.net/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page='+pag+'&pageSize='+size,
             headers: {'Authorization': 'Basic '+ encodedData}
        })
            
     }
        function getAllSensors(encodedData, networkId,size ){
             return  $http({
               method: "GET",
               //url: 'http://192.168.0.18:32332/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page=0&pageSize='+size,
             url:'https://swiss-iot.azurewebsites.net/api/networks/'+ networkId +'/sensors?typeId='+SENSOR_TYPE.ID+'&page=0&pageSize='+size,
             headers: {'Authorization': 'Basic '+ encodedData }
            })
                .then(function (response){
                    return response.headers('X-Tracker-Pagination-TotalCount');
                })
                .catch(function(response){
                    return response.status
                })
        }
       function insertSensors(encodedData, networkId, sensor){
           return $http({
             method:"POST",
             //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors',
             url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors',

             data:sensor,
             headers: {'Authorization': 'Basic '+ encodedData}
           })
            .then(function (response){
                 return response.data;
        })
       }
       function updateSensors(encodedData, networkId, id, newSensor){
           return $http({
             method:"PUT",
             //url:'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/'+id,
             url:'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors/'+id,

             data: newSensor,
             headers: {'Authorization': 'Basic '+ encodedData}
           })
           .then(function (response){
                return response.data;
            })
        }
       function deleteSensors(encodedData, networkId, id){
           return $http({
              method:"DELETE",
              //url:"http://192.168.0.18:32332/api/networks/" +networkId+ "/sensors/" + id,

              url:"https://swiss-iot.azurewebsites.net/api/networks/" +networkId +"/sensors/" + id,
              headers: {'Authorization' :'Basic ' + encodedData}
           })
       }
       function getMeasurements(encodedData, networkId, sensorId, page, pageSize){
           return $http({ method: 'GET',
              //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/'+sensorId+'/readings?page='+page+'&pageSize='+pageSize,
              url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors/'+sensorId+'/readings?page='+page+'&pageSize='+pageSize,
               headers: {'Authorization' :'Basic ' + encodedData}
            })
           .then(measurementsSuccess)
           .catch(measurementsError)
       }
       function measurementsSuccess(response){
           return response.data;
       }
       function measurementsError(response){
           return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
       }
       function getMeasureId(sensTypeID){
         return $http.get('https://swiss-iot.azurewebsites.net/api/sensor-types/'+ sensTypeID)
        //return $http.get('http://192.168.0.18:32332/api/sensor-types/'+ sensTypeID)
             .then(function(response){
               return response.data;
             })
      }
      function getUnitOfMeasure(measureId){
         return $http.get('https://swiss-iot.azurewebsites.net/api/measurements/'+ measureId)
        //return $http.get('http://192.168.0.18:32332/api/measurements/'+ measureId)
           .then(function(response){
             return response.data;
           })
      }
       function getFinalPageReadings(encodedData, networkId, sensorId){
           return $http({
                method: 'GET', 
                //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/'+sensorId+'/readings',
                url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors/'+sensorId+'/readings',
                headers: {'Authorization' :'Basic ' + encodedData}
        })
           .then(function(response){
               return response.headers('X-Tracker-Pagination-TotalCount');
           })
       }
       function getGateway(encodedData, networkId, id){
           return $http({
               method: 'GET',
               //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/'+id+'/connections',
               url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors/'+id+'/connections',
               headers: {'Authorization' :'Basic ' + encodedData}
           })
       }
   })
}());
