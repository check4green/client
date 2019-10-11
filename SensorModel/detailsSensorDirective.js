(function(){
var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope){
                //$scope.detailsDisplay = true;
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#168040';
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
            $scope.vibrationSens = function(id){
                if(id == 6){
                    $scope.vibrations = true;
                }
            }
            $scope.startShowDetails = function(){
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#168040';
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                $scope.detailsDisplay = true;
                $scope.chartDisplay = false;
                $scope.measurementsDisplay = false;
                $scope.showGateways = false;
                $scope.editLocationDisplay = false;
                $scope.editDisplay = false;
                $scope.deleteDisplay = false;

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
