(function(){
  var app = angular.module('sensorApp');
  app.directive('searchGateway', function(){
    return {
      restrict:'E',
      templateUrl: 'Gateways/searchView.html'
    }
  });
}());
