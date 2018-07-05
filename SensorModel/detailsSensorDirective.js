var app = angular.module("sensorApp");
app.directive('detailsSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/detailsSensorDirectiveView.html',
        controller: function($scope, sensorModelService){

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
