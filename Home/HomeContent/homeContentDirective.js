var app = angular.module('sensorApp');
app.directive('content', function(){
    return{
        restrict: 'E',
        templateUrl: 'Home/HomeContent/homeContentView.html',
        controller: function($scope, $sessionStorage){
            if($sessionStorage.homeContent == true){
                $scope.homeContent = true
            }else{
                $scope.homeContent = false;
            }
        }
    }
})