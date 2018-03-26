(function () {
    "use strict";
angular.module("chartApp")
        .factory( "chartService" , ["$q", "$http", function sensorsService($q, $http){
        
        return {load:getChart};
        function getChart(loadOptions){
        return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/1/readings')
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