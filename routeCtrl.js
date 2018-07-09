(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3", "bw.paging"])
    .constant('SENSOR_TYPE', {
        'ID': '0',
        'OUT_OF_RANGE': '0',
        'TITLE': '0'
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
                        SENSOR_TYPE.ID = "33";
                        SENSOR_TYPE.OUT_OF_RANGE = "401";
                        SENSOR_TYPE.TITLE = "Distance";
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
                        SENSOR_TYPE.ID = "31";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Temperature";
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
                        SENSOR_TYPE.ID = "25";
                        SENSOR_TYPE.TITLE = "Electrical Current";
                    }
                }
            }
            })

            .state('airQuality',{
             url: "/airQuality",
             views: {
                'airQuality@':{
                    template: "<air-quality></air-quality>",
                    controller: function($scope, SENSOR_TYPE){
                        SENSOR_TYPE.ID = "34";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Air Quality";
                    }
                }
            }
            })

            }
        ]);
}());

