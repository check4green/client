(function(){
    var app = angular.module("sensorApp");
    app.factory('gatewayService', function($http){
        return{
            getGateways: getGateways,
            getGateway: getGateway,
            getAllGateways: getAllGateways,
            addGateway: addGateway,
            updateGateway: updateGateway,
            deleteGateway: deleteGateway,
            gatewaySensors: gatewaySensors

        }
        function getGateways(encodedData, networkId, page, pageSize){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways?page='+page +'&pageSize='+pageSize,
                url:'https://swiss-iot.azurewebsites.net/api/networks/' +networkId + '/gateways?page='+page + '&pageSize='+ pageSize,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function getGateway(encodedData, networkId, id){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways/' +id,
                url: 'https://swiss-iot.azurewebsites.net/api/networks/' +networkId + '/gateways/' +id,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function getAllGateways(encodedData, networkId){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways',
                url:'https://swiss-iot.azurewebsites.net/api/networks/' +networkId + '/gateways',
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
            .then(function(response){
                return response.headers('X-Tracker-Pagination-TotalCount')
            })
        }
        function addGateway(encodedData, networkId, gateway){
            return $http({
                method: 'POST',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways',
                url:'https://swiss-iot.azurewebsites.net/api/networks/' +networkId+ '/gateways',
                data: gateway,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function updateGateway(encodedData, networkId, id, gateway){
            return $http({
                method: 'PUT',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways/' +id,
                url:'https://swiss-iot.azurewebsites.net/api/networks/' +networkId +'/gateways/' +id,
                data: gateway,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function deleteGateway(encodedData, networkId, id){
            return $http({
                method: 'DELETE',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways/' +id,
                url: 'https://swiss-iot.azurewebsites.net/api/networks/'+ networkId +'/gateways/' +id,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function gatewaySensors(encodedData, networkId, id){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks/' +networkId+'/gateways/' +id + '/connections',
                url:'https://swiss-iot.azurewebsites.net/api/networks/' + networkId + '/gateways/' +id+ '/connections',
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
    });
}());