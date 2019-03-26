(function(){
var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope, sensorModelService, SENSOR_TYPE){
            var vm=this;
            $scope.detailsDisplay = true;
            $scope.vibrationSens = function(id){
                if(id == 37){
                    $scope.vibrations = true;
                }
            }
            
        }
    }
});
app.filter("uploadint", function(){
    return function(input){
        var seconds = input*60
        var days= Math.floor(seconds/86400);
        seconds -= days*86400;
        var hours = Math.floor(seconds/3600);
        seconds -= hours*3600;
        var minutes = Math.floor(seconds/60);
        if(days !=0 && hours !=0 && minutes !=0){
            input = days + "d "+ hours + "h " + minutes + "m";
        }
        if(days ==0 && hours !=0 && minutes !=0){
            input = hours + "h " + minutes + "m";
        }
        if(days!=0 && hours ==0 && minutes !=0){
            input = days +"d "+ minutes+"m";
        }
        if(days !=0 && hours !=0 && minutes ==0){
            input =days +"d "+ hours +"h"
        }
        if(days ==0 && hours ==0 && minutes !=0){
            input = minutes +"m";
        }
        if(days ==0 && hours!=0 && minutes ==0){
            input = hours + "h";
        }
        if(days !=0 && minutes==0 && hours ==0){
            input = days +"d"
        }
        return input;
    }
});
}());
