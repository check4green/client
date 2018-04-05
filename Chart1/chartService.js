(function () {
    "use strict";
angular.module("sensorApp")
        .factory( "chartService" , ["$q", "$http", function chartService($q, $http){
        
        return {load:getChart};
        function getChart(loadOptions){
        return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/42/readings')
        .then(chartSuccess)
        .catch(chartError);
        function chartSuccess(response){
        return{data:response.data};
        }
        function chartError(response){
        return $q.reject('Error retrieving value(s) .(HTTP status:' +response.status + ')')
        }
        }
        }])
}())