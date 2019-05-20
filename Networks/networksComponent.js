(function(){
    var app = angular.module("sensorApp");
    app.component("networks",{
        templateUrl: "Networks/networksView.html",
        controller: "networksCtrl",
        controllerAs: "vm"
    });
}())