(function(){
    var app = angular.module("sensorApp");
    app.factory('networkService', function($http){
        return{
            getNetworks: getNetworks,
            getNetwork: getNetwork,
            addNetwork: addNetwork,
            updateNetwork: updateNetwork,
            deleteNetwork: deleteNetwork

        }
        function getNetworks(encodedData){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks',
                url:'https://swiss-iot.azurewebsites.net/api/networks',
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function getNetwork(encodedData, id){
            return $http({
                method: 'GET',
                //url: 'http://192.168.0.18:32332/api/networks/' +id,
                url:'https://swiss-iot.azurewebsites.net/api/networks/'+ id,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function addNetwork(encodedData, network){
            return $http({
                method: 'POST',
                //url: 'http://192.168.0.18:32332/api/networks',
                url:'https://swiss-iot.azurewebsites.net/api/networks',
                data: network,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function updateNetwork(encodedData,  id, network){
            return $http({
                method: 'PUT',
                //url: 'http://192.168.0.18:32332/api/networks/' +id,
                url: 'https://swiss-iot.azurewebsites.net/api/networks/' +id,
                data: network,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
        function deleteNetwork(encodedData,  id){
            return $http({
                method: 'DELETE',
                //url: 'http://192.168.0.18:32332/api/networks/' +id,
                url: 'https://swiss-iot.azurewebsites.net/api/networks/' +id,
                headers:{'Authorization' : 'Basic ' +encodedData}

            })
        }
    });
}());