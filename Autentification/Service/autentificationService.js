angular.module("sensorApp")
        .factory("autentificationService", function($http, $q){
          return{
            logIn: logIn,
            register: register,
            settings: settings,
            getUser: getUser,
            getCode: getCode,
            resetPassword: resetPassword,
          }
          function logIn(encodedData){
            return $http({
              method: "GET",
              url:'https://swiss-iot.azurewebsites.net/api/users/logIn',
              headers: {'Authorization': 'Basic ' + encodedData}
            })
          }
          function getUser(encodedData){
            return $http({
              method: "GET",
              url: 'https://swiss-iot.azurewebsites.net/api/users',
              headers: { 'Authorization': 'Basic ' + encodedData }
            })
          }
          function register(user){
            return $http.post("https://swiss-iot.azurewebsites.net/api/users", user)
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
              return $http.put('https://swiss-iot.azurewebsites.net/api/users/getCode', email)
          }
          function resetPassword(user){
              return $http.put('https://swiss-iot.azurewebsites.net/api/users/resetPassword', user)
          }

        })
