(function(){
    "use strict";
   var app = angular.module("sensorApp");
   app.controller("distanceCtrl",["$localStorage", "$timeout", "distanceService","$http", function distanceCtrl($localStorage, $timeout, distanceService, $http) {
        var vm = this;
        vm.collapsedRegister = false;
        vm.collapseRegister = function(){
            if(vm.collapsedRegister == false){
                vm.collapsedRegister = true;
                return;
            }
            vm.collapsedRegister = false;
        };
        vm.sensorRegister = function(registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress){
            var sensorPost = {'sensorTypeId':"33",'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gatewayAddress':registerGatewayAddress,'clientAddress':registerClientAddress,userId: "1" }
            distanceService.insertSensors(sensorPost);
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
            
            $localStorage.page = vm.pag;
            console.log(vm.pag);
            distanceService.getSensors(vm.pag)
            .then(function(response){
                 vm.sensors = response.data;
            })
        }
        $http.get("http://192.168.0.18:32333/api/sensors?page=" + vm.pag + "&pageSize=30")
         .then(function(response) {
            vm.sensors = response.data;
         });
       
       //readings
       
        vm.noDataMeasurements = true;
        vm.measurementSensor = function(gatewayAddress, clientAddress){  
            vm.clientAddress = clientAddress;
            vm.gatewayAddress = gatewayAddress;
             vm.page = 0;
            vm.backr = false;
            //set the number of readings/ page
            vm.setPageSize = function(pageSize){
                                vm.pageSize = pageSize;
                                distanceService.getFinalPageReadings()
                                    .then(function(response){
                                        vm.totalReadings = response;
                                        vm.finalPag =Math.round(vm.totalReadings / vm.pageSize) -1;
                                        console.log('lastPage: ', vm.finalPag);
                                    distanceService.getMeasurements(gatewayAddress, clientAddress, vm.page, vm.pageSize)
                                        .then(measureSuccess)
                                    function measureSuccess(measurements){
                                        vm.measurementSensors = measurements;
                                        var measurementDataCheck = measurements.length;
                                        if(measurements==0){                      
                                            vm.noDataMeasurements = true;
                                        } else {
                                            vm.noDataMeasurements = false;
                                        }
                                    }
                                    })
                            }
            
           
            distanceService.getSensorById(gatewayAddress, clientAddress)
                .then(success) 
                  function success(data){
                      vm.sId = data;
                }
           
        };
       
       distanceService.getFinalPageReadings()
                                    .then(function(response){
                                        vm.totalReadings = response;
       })
       //pagination for readings
       
       vm.page = 0;
       if(vm.page == 0){
           vm.backr = false;
       }else {
           vm.backr = true;
       }
       vm.nextr = true;
       vm.paginationReadings = function(pag){
           vm.backr = true;
           if (pag == false){
               vm.page = vm.page -1;
           }
           if(pag == true){
               vm.page = vm.page+1;
           }
           if(vm.page<0){
               vm.page = 0;
           }
           if(vm.page == 0){
                vm.backr = false;
            }else {
                vm.backr = true;
            }
         if (vm.page == vm.finalPag){
             vm.nextr = false;
         }
           
            console.log('page', vm.page)
            distanceService.getMeasurements(vm.gatewayAddress, vm.clientAddress, vm.page, vm.pageSize)
                .then(measureSuccess)
            function measureSuccess(measurements){
                    vm.measurementSensors = measurements;
                }
       }
       
       
       //live view
       
       vm.qs=1;
       vm.quantitySet= function(quantity){
           vm.qs= quantity;
       };
        vm.reload = function(){
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/65/readings")
            .then(function(response) {
                vm.sensor1 = response.data;
            });
            $http.get("http://swiss-iot.azurewebsites.net/api/sensors/91/readings")
            .then(function(response) {
                vm.sensor2 = response.data;
            });
            $timeout(function(){
                vm.reload();
            },1000)
        };
        vm.reload();
       
        
    }]);
}());