angular.module("sensorApp")
        .factory("autentificationService", function($http, $q){
          return{
            logIn: logIn,
            register: register,
            settings: settings,
            getUser: getUser,
          }
          function logIn(encodedData){
            return $http({
              method: "GET",
              url:'http://swiss-iot.azurewebsites.net/api/users/logIn',
              headers: {'Authorization': 'Basic ' + encodedData}
            })
          }
          function getUser(encodedData){
            return $http({
              method: "GET",
              url: 'http://swiss-iot.azurewebsites.net/api/users',
              headers: { 'Authorization': 'Basic ' + encodedData }
            })
          }
          function register(user){
            return $http.post("http://swiss-iot.azurewebsites.net/api/users", user)
          }
          function settings(encodedData, newUser){
            return $http({
              method: 'PUT',
              url: 'http://swiss-iot.azurewebsites.net/api/users',
              headers: {'Authorization': 'Basic '+ encodedData},
              data: newUser,
            })
          }

        })
