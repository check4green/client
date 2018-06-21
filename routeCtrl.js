(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3"]);
    app.config(["$stateProvider", "$urlRouterProvider",
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/index");
                   $stateProvider
            .state("index",{
             url:"/home",
             template: "<index></index>"
            })
            .state('distanceList',{
             url:  "/distance",
             views: {
                'distance@':{
                    template: "<distance></distance>"
                }
            }
            });
            }
        ]);
}());