(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("requestCtrl", function ($scope, autentificationService) {
        var vm = this;
        $scope.requestDemo = function(fullName, emailAddr, companyName, job, compSize, phone, message){
            $scope.request = {fullName: fullName, email:emailAddr, company: companyName, jobTitle: job, companiSize: compSize, phoneNumber: phone, message: message}
            autentificationService.getRequestDemo($scope.request)
                .then(function(){
                    $scope.successMessage = true;
                    $scope.errorMessage = false;
                })
                .catch(function(response){
                    $scope.errorMessage = true;
                    $scope.successMessage = false;
                    $scope.errorMsg = response.data.message
                    if(!fullName && !emailAddr && !companyName){
                        $scope.errorMsg = 'You have to fill the required fields!'
                    }
                    if(!fullName && emailAddr && companyName){
                        $scope.errorMsg = 'The name is required!'
                    }
                    if(fullName && !emailAddr && companyName){
                        $scope.errorMsg = 'The email is required!'
                    }
                    if(fullName && emailAddr && !companyName){
                        $scope.errorMsg = 'The company name is required!'
                    }
                    if ((fullName && !emailAddr && !companyName) || (!fullName && !emailAddr && companyName) || (!fullName && emailAddr && !companyName)){
                        $scope.errorMsg = 'You have to fill all required fields!'
                    }
                })
        }
    });
}());