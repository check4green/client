(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "common.services", "ui.router", "dx", "dataResourceMock"]);
    
    
    app.config(["$stateProvider", "$urlRouterProvider", 
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/");
                   $stateProvider
                   .state("dashboard",{
                       url:"/dashboards",
                       template: "<dashboard></dashboard>",
                   })
                   .state("measurements", {
                       url: "/measurements",
                       template: "<measurement></measurement>"
                   })
                   .state("sensorList", {
                       url: "/sensors",
                       template: "<sensor></sensor>",
                   })
                   .state("sensorType", {
                       url: "/types",
                       template: "<type></type>",
                   })
                   .state("chart", {
                       url: "/charts",
                       template: "<chart></chart>",
                   });

               }
        ]);
}());