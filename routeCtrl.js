(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3", "bw.paging"])
    .constant('SENSOR_TYPE', {
        'ID' : '0'
    });
    app.config(["$stateProvider", "$urlRouterProvider",
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/index");
                   $stateProvider
            .state("index",{
             url:"/index",
             views: {
                'index@':{
                    template: "<index></index>"
                }
            }
        })
            .state('distance',{
             url: "/distance",
             views: {
                'distance@':{
                    template: "<distance></distance>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "33"
                    }
                }
            }
            })

            .state('temperature',{
             url: "/temperature",
             views: {
                'temperature@':{
                    template: "<temperature></temperature>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "24"
                    }
                }
            }
            })

            .state('electricalCurrent',{
             url: "/electricalCurrent",
             views: {
                'electricalCurrent@':{
                    template: "<electrical-current></electrical-current>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "25"
                    }
                }
            }
            })

            .state('airQuality',{
             url: "/airQuality",
             views: {
                'airQuality@':{
                    template: "<air-quality></air-quality>"
                }
            }
            })

            }
        ]);
}());

