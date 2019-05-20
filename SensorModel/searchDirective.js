(function(){
  var app = angular.module('sensorApp');
  app.directive('search', function(){
    return {
      restrict:'E',
      templateUrl: 'SensorModel/searchView.html'
    }
  });
}());
