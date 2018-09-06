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
