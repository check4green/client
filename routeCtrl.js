(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "common.services", "ui.router", "dx"]);


    app.config(["$stateProvider", "$urlRouterProvider",
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/index");
                   $stateProvider
                .state("index",{
                url:"/home",
                template: "<index></index>"
               })
               .state("categories",{
                url: "/home/categories",
                template: "<categories></categories>"
               })
               .state('categories.sensorList',{
                    url:  "/home/categories/sensors",
                    views: {
                       'filters@':{
                           template: "<sensor></sensor>"
                       }
                   }
               })
               .state("measurements", {
                   url: "/home/categories/sensors/measurements",
                   template: "<measurement></measurement>"
               })
               .state("chart", {
                   url: "/home/categories/sensors/measurements/charts",
                   template: "<chart></chart>",
               });

               }
        ]);
}());