var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope, sensorModelService, SENSOR_TYPE){
            var vm=this;
        $scope.outOfRangeError = SENSOR_TYPE.OUT_OF_RANGE;

        $scope.detailsDisplay = true;
        sensorModelService.getMeasureId()
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
});
