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
        getPageFinal: getPageFinal,
        getFinalPageReadings: getFinalPageReadings,
        getAllSensors: getAllSensors,
        getMeasureId:getMeasureId,
        getUnitOfMeasure:getUnitOfMeasure,
        getSensorsByAddress: getSensorsByAddress,
    }
       function getPageFinal(gatewayAddress, clientAddress ,size){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=0&pageSize=' + size)
           return $http.get('https://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAddress+'/readings?page=0&pageSize=' + size)
           .then(function(response){
               return response.headers('X-Tracker-Pagination-TotalCount')
           })
       }
       function getSensorsByAddress(gatewayAddress, clientAddress, encodedData){
           return $http({
                method: "GET",
                url:'https://swiss-iot.azurewebsites.net/api/sensors/address/'+ gatewayAddress + "/"+ clientAddress,
                headers:{'Authorization' : 'Basic ' +encodedData}

         })
           .then(function(response){
               return response.data;
           })
       }
       function getFinalPage(size, encodedData){
        //    return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=0&pageSize=' +size)
           return  $http({
             method: "GET",
             url:'https://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/users/sensors?page=0&pageSize=' +size,
             headers:{'Authorization' : 'Basic ' +encodedData}
           })
             .then(function (response){
                return response.headers('X-Tracker-Pagination-TotalCount');
           })
       }
       function  getSensors(pag, size, encodedData){
            // return $http.get("http://192.168.0.18:32333/api/sensor-types/" + SENSOR_TYPE.ID + "/sensors?page=" + pag + "&pageSize=" + size)
            return $http({method: "GET",
            url:"https://swiss-iot.azurewebsites.net/api/sensor-types/"+ SENSOR_TYPE.ID +"/users/sensors?page=" + pag + "&pageSize=" + size,
            headers: {'Authorization': 'Basic '+ encodedData}
        })
            
     }
        function getAllSensors(size, encodedData){
            //    return  $http.get('http://192.168.0.18:32333/api/sensor-types/' + SENSOR_TYPE.ID + '/sensors?page=0&pageSize=' + size)
             return  $http({
               method: "GET",
               url:'https://swiss-iot.azurewebsites.net/api/sensor-types/' + SENSOR_TYPE.ID + '/users/sensors?page=0&pageSize=' + size,
               headers: {'Authorization': 'Basic '+ encodedData }
            })
                .then(function (response){
                    return response.headers('X-Tracker-Pagination-TotalCount');
                })
        }
       function insertSensors(sensor,encodedData){
        //    return $http.post("http://192.168.0.18:32333/api/sensors", sensor)
           return $http({
             method:"POST",
             url:"https://swiss-iot.azurewebsites.net/api/sensors",
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
             url: "https://swiss-iot.azurewebsites.net/api/sensors/address/"+gatewayAdress +"/"+clientAddress,
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
             url:"https://swiss-iot.azurewebsites.net/api/sensors/address/" + gatewayAddress + "/" + clientAddress,
             headers: {'Authorization' :'Basic ' + encodedData}
           })
       }
       function getMeasurements(gatewayAddress, clientAddress, page, pageSize, encodedData){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+ page +'&pageSize='+ pageSize)
           return $http({ method: 'GET',
               url:'https://swiss-iot.azurewebsites.net/api/sensors/address/' + gatewayAddress  + '/' +clientAddress + '/readings?page='+page +'&pageSize='+ pageSize,
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
       function getMeasureId(sensTypeId){
        // return $http.get('http://192.168.0.18:32333/api/sensor-types/'+ sensTypeID)
        return $http.get('https://swiss-iot.azurewebsites.net/api/sensor-types/'+ sensTypeId)
             .then(function(response){
               return response.data;
             })
      }
      function getUnitOfMeasure(measureId){
        // return $http.get('http://192.168.0.18:32333/api/measurements/'+ measureId)
        return $http.get('https://swiss-iot.azurewebsites.net/api/measurements/'+ measureId)
           .then(function(response){
             return response.data;
           })
      }
       function getFinalPageReadings(gatewayAddress, clientAdress, encodedData){
        //    return $http.get('http://192.168.0.18:32333/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings')
           return $http({
                method: 'GET', 
                url:'https://swiss-iot.azurewebsites.net/api/sensors/address/'+gatewayAddress+'/'+clientAdress+'/readings',
                headers: {'Authorization' :'Basic ' + encodedData}
        })
           .then(function(response){
               return response.headers('X-Tracker-Pagination-TotalCount');
           })
       }
   })
}());
