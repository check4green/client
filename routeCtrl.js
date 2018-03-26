(function(){
    "use strict";
    var app = angular.module("sensorApp", [ "ui.router", "dx"]);
    
    
    app.config(["$stateProvider", "$urlRouterProvider", 
               function($stateProvider, $urlRouterProvider){
                   $urlRouterProvider.otherwise("/");
                   $stateProvider
                   .state("dashboard",{
                       url:"/dashboards",
                       templateUrl: "/Dashboard/dashboardView.html",
                       controller: "dashboardCtrl as vm",
                   })
                   .state("measurements", {
                       url: "/measurements",
                       templateUrl: "/Measurements/measurementsView.html",
                       controller:"MeasurementsCtrl as vm",
                   })
                   .state("sensorList", {
                       url: "/sensors",
                       templateUrl: "/SensorList/sensorListView.html",
                       controller: "sensorCtrl as vm",
                   })
                   .state("sensorType", {
                       url: "/types",
                       templateUrl: "/SensorType/sensorTypeView.html",
                       controller:"typeCtrl as vm",
                   });
               }
        ]);
}());