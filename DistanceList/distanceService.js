// (function () {
//     "use strict";
// angular.module("sensorApp")
//         .factory("distanceService" , ["$q", "$http", function distanceService($q, $http){

//         return{
//             getSensor1: function(){
//                 return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/57/readings')
//                 .then(sensor1Success)
//                 .catch(sensor1Error);
//                 function sensor1Success(response){
//                     return response.data;
//                 }
//                 function sensor1Error(response){
//                     return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
//                 }
//             },
//             getSensor2: function(){
//                 return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/46/readings')
//                 .then(sensor2Success)
//                 .catch(sensor2Error);
//                 function sensor2Success(response){
//                     return response.data;
//                 }
//                 function sensor2Error(response){
//                     return $q.reject('Error retrieving value(s) .(HTTP status:' + response.status + ')')
//                 }
//             }
//         };

//     }])
// }())