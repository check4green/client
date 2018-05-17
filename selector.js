angular.module('sensorApp').controller('clickCtrl',[clickCtrl]);
function clickCtrl(){
    var vm = this;
    vm.myStyle = function(value){
        if(value === 1){
            vm.Style1={"color":'black'};
            vm.Style2={};
            vm.Style3={};
            vm.Style4={};
        }else if(value === 2){
            vm.Style2={"color":'black'};
            vm.Style1={};
            vm.Style3={};
            vm.Style4={};
        }else if(value === 3){
            vm.Style3={"color":'black'};
            vm.Style2={};
            vm.Style1={};
            vm.Style4={};
        }else if(value === 4){
            vm.Style4={"color":'black'};
            vm.Style2={};
            vm.Style3={};
            vm.Style1={};
        }else if(value === 5){
            vm.Style5={"color":'black'};
            vm.Style4={};
            vm.Style2={};
            vm.Style3={};
            vm.Style1={};
        }else if(value === 6){
            vm.Style6={"color":'black'};
            vm.Style4={};
            vm.Style2={};
            vm.Style3={};
            vm.Style1={};
        }else if(value === 7){
            vm.Style7={"color":'#f5c58a'};
            vm.Style4={};
            vm.Style2={};
            vm.Style3={};
            vm.Style1={};
        }

    };
}