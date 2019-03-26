(function(){
      "use strict";
var app = angular.module("sensorApp");
app.directive("calculator", function(){
      return {
            restrict: 'E',
            templateUrl: 'Calculator/rangeBarView.html',
            controller: function($scope){
                  var slider1 = document.getElementById('range1');
                  var output1 = document.getElementById('value1');
                  output1.innerHTML = slider1.value;
                  slider1.oninput = function(){
                        output1.innerHTML = this.value;
                        $scope.calculateCost($scope.price1, output1, change1);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider2 = document.getElementById('range2');
                  var output2 = document.getElementById('value2');
                  output2.innerHTML = slider2.value;
                  slider2.oninput = function(){
                        output2.innerHTML = this.value;
                        $scope.calculateCost($scope.price2, output2, change2);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider3 = document.getElementById('range3');
                  var output3 = document.getElementById('value3');
                  output3.innerHTML = slider3.value;
                  slider3.oninput = function(){
                        output3.innerHTML = this.value;
                        $scope.calculateCost($scope.price3, output3, change3);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider4 = document.getElementById('range4');
                  var output4 = document.getElementById('value4');
                  output4.innerHTML = slider4.value;
                  slider4.oninput = function(){
                        output4.innerHTML = this.value;
                        $scope.calculateCost($scope.price4, output4, change4);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider5 = document.getElementById('range5');
                  var output5 = document.getElementById('value5');
                  output5.innerHTML = slider5.value;
                  slider5.oninput = function(){
                        output5.innerHTML = this.value;
                        $scope.calculateCost($scope.price5, output5, change5);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider6 = document.getElementById('range6');
                  var output6 = document.getElementById('value6');
                  output6.innerHTML = slider6.value;
                  slider6.oninput = function(){
                        output6.innerHTML = this.value;
                        $scope.calculateCost($scope.price6, output6, change6);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  var slider7 = document.getElementById('range7');
                  var output7 = document.getElementById('value7');
                  output7.innerHTML = slider7.value;
                  slider7.oninput = function(){
                        output7.innerHTML = this.value;
                        $scope.calculateCost($scope.price7, output7, change7);
                        $scope.calculateTotal();
                        $scope.calculateTotalTwo();
                  }
                  $scope.price1 = 94.8;
                  $scope.price2 = 94.8;
                  $scope.price3 = 118.8;
                  $scope.price4 = 94.8;
                  $scope.price6 = 238.8;
                  $scope.price7 = 58.8;
                  $scope.price5 = 58.8;
                  var change1 =document.getElementById('change1');
                  change1.innerHTML = $scope.price1*output1.innerHTML;
                  var change2 =document.getElementById('change2');
                  change2.innerHTML = $scope.price2*output2.innerHTML;
                  var change3 =document.getElementById('change3');
                  change3.innerHTML = $scope.price3*output3.innerHTML;
                  var change4 =document.getElementById('change4');
                  change4.innerHTML = $scope.price4*output4.innerHTML;
                  var change6 =document.getElementById('change6');
                  change6.innerHTML = $scope.price6*output6.innerHTML;
                  var change7 =document.getElementById('change7');
                  change7.innerHTML = $scope.price7*output7.innerHTML;
                  var change5 =document.getElementById('change5');
                  change5.innerHTML = $scope.price5*output5.innerHTML;
                  $scope.calculateCost = function(price, output, change){
                        change.innerHTML = Math.round(price*output.innerHTML* 10) /10;
                  }
                  var total = document.getElementById('total');
                  total.innerHTML = 0;
                  $scope.calculateTotal = function(){
                        var totalRounded = (+change1.innerHTML) + (+change2.innerHTML) + (+change3.innerHTML) + (+change4.innerHTML) + (+change6.innerHTML) + (+change7.innerHTML) + (+change5.innerHTML);
                        total.innerHTML = Math.round(totalRounded*10) /10;
                  }
                  var totalTwo = document.getElementById('totalTwo');
                  totalTwo.innerHTML = 0;
                  $scope.calculateTotalTwo = function(){
                        var totalRounded2 = (+change1.innerHTML) + (+change2.innerHTML) + (+change3.innerHTML) + (+change4.innerHTML) + (+change6.innerHTML) + (+change7.innerHTML) + (+change5.innerHTML);
                        totalTwo.innerHTML = Math.round(totalRounded2*10) /10;
                  }
            }
      }
});
}());
