(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("requestCtrl", function ($scope, autentificationService) {
        var vm = this;
        $scope.requestDemo = function(fullName, emailAddr, companyName, job, compSize, phone, message){
            $scope.request = {fullName: fullName, email:emailAddr, company: companyName, jobTitle: job, companySize: compSize, phoneNumber: phone, message: message}
            autentificationService.getRequestDemo($scope.request)
                .then(function(){
                    $scope.successMessage = true;
                })
                .catch(function(response){
                    $scope.errorMessage = true;
                    $scope.message = response.data.message
                    if(!fullName && !emailAddr && !companyName){
                        $scope.message = 'You have to fill the required fields!'
                    }
                    if(!fullName && emailAddr && companyName){
                        $scope.message = 'The name is required!'
                    }
                    if(fullName && !emailAddr && companyName){
                        $scope.message = 'The email is required!'
                    }
                    if(fullName && emailAddr && !companyName){
                        $scope.message = 'The company name is required!'
                    }
                    if ((fullName && !emailAddr && !companyName) || (!fullName && !emailAddr && companyName) || (!fullName && emailAddr && !companyName)){
                        $scope.message = 'You have to fill all required fields!'
                    }
                })
        }
    });
}());