(function () {
    "use strict";
angular.module("sensorApp")
        .factory( "chartService" , [ "$http", "$q", chartService])
       function chartService($http, $q) {
            return { load:getChart }
        function getChart(loadOptions){
            return $http.get('http://swiss-iot.azurewebsites.net/api/sensors/address/0xff/0xb1/readings')
                .then(chartSuccess)
                .catch(chartError);
        
        function chartSuccess(response){
            return response.data;
            }
        function chartError(response){
            return $q.reject('Error retrieving value(s) .(HTTP status:' +response.status + ')')
            }
        
       }
       }
}())