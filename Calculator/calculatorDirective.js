angular.module("sensorApp")
        .directive("calculator", function(){
          return {
            restrict: 'E',
            templateUrl: 'Calculator/rangeBarView.html',
            controller: function($scope, $timeout){
              var slider1 = document.getElementById('range1');
              var output1 = document.getElementById('value1');
              output1.innerHTML = slider1.value;
              slider1.oninput = function(){
                  output1.innerHTML = this.value;
                  $scope.calculateCost1();
                  $scope.calculateCost2();
                  $scope.calculateCost3();
                  $scope.calculateCost4();
                  $scope.calculateTotal();
                }
                var slider2 = document.getElementById('range2');
                var output2 = document.getElementById('value2');
                output2.innerHTML = slider2.value;
                slider2.oninput = function(){
                    output2.innerHTML = this.value;
                    $scope.calculateCost2();
                    $scope.calculateTotal();
                  }
                  var slider3 = document.getElementById('range3');
                  var output3 = document.getElementById('value3');
                  output3.innerHTML = slider3.value;
                  slider3.oninput = function(){
                      output3.innerHTML = this.value;
                      $scope.calculateCost3();
                      $scope.calculateTotal();
                    }
                    var slider4 = document.getElementById('range4');
                    var output4 = document.getElementById('value4');
                    output4.innerHTML = slider4.value;
                    slider4.oninput = function(){
                        output4.innerHTML = this.value;
                        $scope.calculateCost4();
                        $scope.calculateTotal();
                      }
              $scope.price1 = 25;
              $scope.price2 = 50;
              $scope.price3 = 250;
              $scope.price4 = 500;
              var change1 =document.getElementById('change1');
              change1.innerHTML = $scope.price1*output1.innerHTML;
              var change2 =document.getElementById('change2');
              change2.innerHTML = $scope.price2*output2.innerHTML;
              var change3 =document.getElementById('change3');
              change3.innerHTML = $scope.price3*output3.innerHTML;
              var change4 =document.getElementById('change4');
              change4.innerHTML = $scope.price4*output4.innerHTML;
              $scope.calculateCost1 = function(){
                  change1.innerHTML = $scope.price1*output1.innerHTML;
              }
              $scope.calculateCost2 = function(){
                  change2.innerHTML = $scope.price2*output2.innerHTML;
              }
              $scope.calculateCost3 = function(){
                  change2.innerHTML = $scope.price3*output3.innerHTML;
              }
              $scope.calculateCost4 = function(){
                  change4.innerHTML =$scope.price1*output4.innerHTML;
              }
              var total = document.getElementById('total');
              total.innerHTML =0 ;
              $scope.calculateTotal = function(){
                total.innerHTML = parseInt(change1.innerHTML) + parseInt(change2.innerHTML) + parseInt(change3.innerHTML) + parseInt(change4.innerHTML);
              }
        }
      }
})
