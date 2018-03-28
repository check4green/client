var app = angular.module('sensorApp', []);
app.controller('myCtrl', function($scope) {
    $scope.showMe = false;
    $scope.showMeCategories = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
        $scope.showMeCategories = !$scope.showMeCategories;
        $scope.myFuncCategories = function(){
            $scope.showMe = !$scope.showMe
            $scope.showMeCategories = !$scope.showMeCategories;
        }
    $scope.myCategories = function(){
        
    }   
    } //aici se inchide functia pentru butonul CATEGORIES

});