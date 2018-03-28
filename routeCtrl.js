(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "common.services", "ui.router", "dx", "dataResourceMock"]);
    
    app.config(["$stateProvider", "$urlRouterProvider", 
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/");
                   $stateProvider
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