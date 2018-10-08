var app = angular.module('sensorApp');
app.directive('registerNetwork', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/registerNetworkView.html',
        controller: function($scope){
            $scope.registerNetwork = false;
            $scope.startRegisterNetwork = function(){
                if($scope.registerNetwork == false){
                    $scope.registerNetwork = true;
                }
                $scope.buttons = false;
                $scope.registerButton = false;
                $scope.registerNetworkButton = false;
                $scope.change = false;
                $scope.backButton = false;
            }
            $scope.cancelRegister = function(){
                $scope.buttons = true;
                $scope.registerNetwork = false;
                $scope.registerNetworkButton = true;
            }
            $scope.registerNetworkFunc = function (registerGatewayAddress, networkName){

            }
        }
    }
})