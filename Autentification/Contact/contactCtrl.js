(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("contactCtrl", function ($scope, autentificationService) {
       $scope.sendMsg = function(name, mail, number, msg){
           $scope.contact = {
               fullName: name,
               email: mail,
               phone: number,
               message: msg
           }
           autentificationService.sendMessage($scope.contact)
           .then(function(){
               $scope.succMsg = true;
           })
           .catch(function(response){
               $scope.errorMsg;
                $scope.message = response.message;
           })
       }
        var vm = this;
        
    });
}());