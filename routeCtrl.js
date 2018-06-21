(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "common.services", "ui.router", "dx", "ngStorage", "angularCharts", "d3"]);
    app.config(["$stateProvider", "$urlRouterProvider",
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/index");
                   $stateProvider
                .state("index",{
                url:"/home",
                template: "<index></index>"
               })
               .state("menu",{
                   url: "/home/menu",
                   views:{
                       'menu@':{
                        template:"<menu></menu>" 
                       },
                   }
               })
               .state("categories",{
                url: "/home/menu/categories",

                views:{
                    'categories@':{
                       template: "<categories></categories>" 
                    }
                }
               })

               .state('categories.sensorList',{
                    url:  "/home/categories/sensors",
                    views: {
                       'filters@':{
                           template: "<sensor></sensor>"
                       },
                   }
               })

               .state('categories.distanceList',{
                url:  "/home/categories/distance/",
                views: {
                   'distance@':{
                       template: "<distance></distance>"
                   }
               }
               })

               .state( 'categories.humidityList',{
               url: "/home/categories/humidity",
               views: {
                   'humidity@':{
                       template: "<humidity></humidity>"
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