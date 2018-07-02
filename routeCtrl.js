(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3"]);
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
            .state('distanceList',{
             url: "/distance",
             views: {
                'distance@':{
                    template: "<distance></distance>"
                }
            }
            })

            .state('temperatureList',{
             url: "/temperature",
             views: {
                'temperature@':{
                    template: "<temperature></temperature>"
                }
            }
            })

            .state('electricalCurrentList',{
             url: "/electricalCurrent",
             views: {
                'electricalCurrent@':{
                    template: "<electrical-current></electrical-current>"
                }
            }
            })

            .state('airQualityList',{
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