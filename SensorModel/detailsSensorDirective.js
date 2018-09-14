var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope, sensorModelService, SENSOR_TYPE){
            var vm=this;
            $scope.detailsDisplay = true
            $scope.outOfRange = function(sensType){
                if(sensType == 33){
                    $scope.outOfRangeError = 401;
                } else if(sensType == 31){
                    $scope.outOfRangeError = 101;
                }else if(sensType == 34){
                    $scope.outOfRangeError = 101;
                }
            }
            $scope.measureUnit = function(sensTypeId){
                sensorModelService.getMeasureId(sensTypeId)
                    .then(idSuccess)
                function idSuccess(data){
                    $scope.id= data.measureId;
                    sensorModelService.getUnitOfMeasure($scope.id)
                        .then(unitOfMeasureSuccess)
                    function unitOfMeasureSuccess(data){
                        $scope.unitOfMeasure = data.unitOfMeasure;
                    }
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
})
