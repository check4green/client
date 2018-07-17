angular.module("sensorApp")
        .directive("selectType", function(){
          return {
            restrict:'E',
            templateUrl:'Autentification/Register/selectType.html',
            controller: function($scope){
              var expanded = false;
              $scope.showCheckBoxes = function(){
                var checkboxes = document.getElementById("checkboxes");
                if (!expanded){
                  checkboxes.style.display = "block";
                  expanded = true;
                }else {
                  checkboxes.style.display = "none";
                  expanded = false;
                }
              }
              $scope.sensTypeId =[];
              $scope.getdistId = function(dist){
                if(dist == true){
                  $scope.sensTypeId.push(33)
                }else{
                  var index = $scope.sensTypeId.indexOf(33);
                  $scope.sensTypeId.splice(index, 1);
                }
                console.log("Checked: ",$scope.sensTypeId )
              }
              $scope.getTempId = function(temp){
                 if(temp == true){
                  $scope.sensTypeId.push(31)
                }else {
                  var index = $scope.sensTypeId.indexOf(31);
                  $scope.sensTypeId.splice(index, 1);
                }
                console.log("Checked: ",$scope.sensTypeId )
              }
              $scope.getElectrId = function(elecCurrent){
                if(elecCurrent == true){
                  $scope.sensTypeId.push(25)
                }else{
                  var index = $scope.sensTypeId.indexOf(25);
                  $scope.sensTypeId.splice(index, 1);
                }
                console.log("Checked: ",$scope.sensTypeId )
              }
              $scope.getAirQId = function(airQ){
                if(airQ == true){
                  $scope.sensTypeId.push(34)
                }else{
                  var index = $scope.sensTypeId.indexOf(34);
                  $scope.sensTypeId.splice(index, 1);
                }
                console.log("Checked: ",$scope.sensTypeId )
              }
            }
          }
        })
