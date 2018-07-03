 angular.module('sensorApp').controller('sensorCtrl',[sensorCtrl]);
    function sensorCtrl(){
        var vm = this;
            vm.showMe = true;
                vm.myFunc = function(){
                    mv.showMe = !vm.showMe;
                }


    }