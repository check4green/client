angular.module("sensorApp")
        .factory("autentificationService", function($http, $q){
          return{
            logIn: logIn,
            register: register,
            settings: settings,
            getUser: getUser,
            getCode: getCode,
            resetPassword: resetPassword,
            getUserSensors: getUserSensors,
            getAllSensors : getAllSensors,
            getSensorById: getSensorById,
            activateAccount: activateAccount,
            getActivationCode: getActivationCode,
            getRequestDemo: getRequestDemo,
            sendMessage: sendMessage,
          }
          function logIn(encodedData){
            return $http({
              method: "POST",
              url:'https://swiss-iot.azurewebsites.net/api/users/logIn',
              //url: 'http://192.168.0.18:32332/api/users/logIn',
              headers: {'Authorization': 'Basic ' + encodedData}
            })
          }
          function getUser(encodedData){
            return $http({
              method: "GET",
              //url: 'http://192.168.0.18:32332/api/users',
              url: 'https://swiss-iot.azurewebsites.net/api/users',
              headers: { 'Authorization': 'Basic ' + encodedData }
            })
          }
          function register(user){
            return $http.post("https://swiss-iot.azurewebsites.net/api/users", user)
          }
          function activateAccount(code){
            return $http.put("https://swiss-iot.azurewebsites.net/api/users/validation", code)
          }
          function getActivationCode(email){
            return $http.put("https://swiss-iot.azurewebsites.net/api/users/getValidationCode", email)
          }
          function settings(encodedData, newUser){
            return $http({
              method: 'PUT',
              url: 'https://swiss-iot.azurewebsites.net/api/users',
              headers: {'Authorization': 'Basic '+ encodedData},
              data: newUser,
            })
          }
          function getCode(email){
              return $http.put('https://swiss-iot.azurewebsites.net/api/users/getResetCode', email)
          }
          function resetPassword(user){
              return $http.put('https://swiss-iot.azurewebsites.net/api/users/resetPassword', user)
          }

          function getUserSensors(encodedData, networkId, page, pageSize){
            return $http({
              method:'GET',
              //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors?page='+page+'&pageSize='+pageSize,
              url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors?page='+page+'&pageSize='+pageSize,
              headers: {'Authorization': 'Basic '+ encodedData}
            })
          }
          function getAllSensors(encodedData, networkId){
            return $http({
              method: 'GET',
              //url: 'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors',
              url: 'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors',

              headers: {'Authorization': 'Basic '+ encodedData}
            })
            .then(function(response){
              return response.headers('X-Tracker-Pagination-TotalCount')
            })
            .catch(function(response){
              return response.status;
            })
          }
          function getSensorById(encodedData, networkId, id){
            return $http({
              method: 'GET',
              //url:'http://192.168.0.18:32332/api/networks/'+networkId+'/sensors/' +id,
              url:'https://swiss-iot.azurewebsites.net/api/networks/'+networkId+'/sensors/' +id,
              headers: {'Authorization': 'Basic '+ encodedData}
            })
          }
          function getRequestDemo(request){
            return $http.post('https://swiss-iot.azurewebsites.net//api/demoRequest', request)
          }
          function sendMessage(contact){
            return $http.post('https://swiss-iot.azurewebsites.net//api/contact', contact)
          }
        })
