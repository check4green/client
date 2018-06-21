(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("distanceCtrl",["$scope", "$localStorage", "$timeout", "distanceService","$http", function distanceCtrl($scope, $localStorage, $timeout, distanceService, $http) {
        var vm = this;

        $scope.distanceList = true;

        vm.expandSelected = function(sensor){
            vm.sensors.forEach(function(val){
                val.expanded=false;
            })
            sensor.expanded=true;
        };

       //sensors
        distanceService.getFinalPage()
        .then(finalPage);
        function finalPage(data){
           vm.lastPage = data;
            console.log('Last page', vm.lastPage);
            $localStorage.final = vm.lastPage;
           if(vm.pag == vm.lastPage-1){
                vm.next = false;
            }else {
                vm.next = true;
            }
       }
         if($localStorage.page){
                vm.pag = $localStorage.page;
            }else{
                vm.pag = 0;
            }
        if ($localStorage.page){
        if ($localStorage.page == 0){
            vm.back = false;
        }else{
            vm.back = true;
        }
        }else{
            vm.back = false;
        }
        if (vm.pag == $localStorage.final-1){
            vm.next = false;
        }else {
            vm.next = true;
        }
        vm.pagination = function(pg){
           
            if(pg==false){
                vm.pag = vm.pag-1;
            }
            if(pg==true && vm.totalCount != 0){
                vm.pag = vm.pag+1;
                vm.back = true;
            }
            if(vm.pag<0){
                vm.pag = 0;
            }
            if (vm.pag == 0){
                vm.back = false;
            }
            
            if(vm.pag == $localStorage.final-1){
                vm.next = false;
            }else{
                vm.next = true;
            }
            $localStorage.page = vm.pag;
            console.log(vm.pag);
            distanceService.getSensors(vm.pag)
            .then(function(response){
                 vm.sensors = response.data;
            })
        }
        $http.get("http://192.168.0.18:32333/api/sensors?page=" + vm.pag + "&pageSize=30")
        // $http.get("http://swiss-iot.azurewebsites.net/api/sensors?page=" + vm.pag + "&pageSize=30")
         .then(function(response) {
            vm.sensors = response.data;
         });

         vm.getLastRead = function(GA, CA){
            distanceService.getMeasurements(GA, CA, '0', '1')
                .then(measureSuccess)
                    function measureSuccess(measurements){
                        vm.lastRead = measurements;
                        if(measurements==0){                   
                            vm.noRead = true;
                        } else {
                            vm.noRead = false;
                        }
                    } 
                    vm.lastRead = null;
                    if(vm.lastRead == null){
                        vm.noRead = true;
                    } else {
                        vm.noRead = false;
                    }
        };
        
       //live view
       
    //    vm.qs=10;
    //    vm.quantitySet= function(quantity){
    //        vm.qs = quantity;
    //    };
    //    vm.reload = function(){
    //     $http.get("http://192.168.0.18:32333/api/sensors/46/readings")
    //     .then(function(response) {
    //         vm.sensor1 = response.data;
    //     });
    //     $timeout(function(){
    //         vm.reload();
    //     },1000)
    // };
    // vm.reload();

    }]);
}());