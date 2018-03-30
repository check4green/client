(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "common.services", "ui.router", "dx"]);
    
    
    app.config(["$stateProvider", "$urlRouterProvider", 
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/index");
                   $stateProvider
                .state("index",{
                url:"/index",
                template: "<index></index>"
               })
               .state("sensorList", {
                   url: "/sensors",
                   template: "<sensor></sensor>",
               })
               .state("measurements", {
                   url: "/measurements",
                   template: "<measurement></measurement>"
               })
               .state("chart", {
                   url: "/charts",
                   template: "<chart></chart>",
               });

               }
        ]);
}());