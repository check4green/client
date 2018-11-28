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
                   $urlRouterProvider.otherwise("/home");
                   $stateProvider
            .state("home",{
             url:"/home",
             views: {
                'home@':{
                    template: "<home></home>",
                    controller: function($scope, $sessionStorage){
                        $sessionStorage.homeContent = true;
                    }
                }
            }
        })
            .state('logIn',{
             url: "/logIn",
             views: {
                'logIn@':{
                    template: "<log-in></log-in>"
                }
            }
        })
            .state('forgotPassword',{
             url: "/forgotPassword",
             views: {
                'forgotPassword@':{
                    template: "<forgot-password></forgot-password>"
                }
            }
        })
            .state('resetPassword',{
             url: "/resetPassword",
             views: {
                'resetPassword@':{
                    template: "<reset-password></reset-password>"
                }
            }
        })
            .state('contact',{
             url: "/contact",
             views: {
                'contact@':{
                    template: "<contact></contact>"
                }
            }
        })
            .state('request',{
             url: "/request",
             views: {
                'request@':{
                    template: "<request></request>"
                }
            }
        })
            .state('home.aboutUs',{
             url: "/aboutUs",
             views: {
                'aboutUs@':{
                    template: "<about-us></about-us>",
                    controller: function($scope, $sessionStorage){
                        $sessionStorage.homeContent = false;
                    }
                    
                }
            }
        })
            .state('home.pricing',{
             url: "/pricing",
             views: {
                'pricing@':{
                    template: "<pricing></pricing>",
                    controller: function($scope, $sessionStorage){
                        $sessionStorage.homeContent = false;
                    }
                }
            }
        })
            .state('home.technology',{
             url: "/technology",
             views: {
                'technology@':{
                    template: "<technology></technology>",
                    controller: function($scope, $sessionStorage){
                        $sessionStorage.homeContent = false;
                    }
                }
            }
        })
            .state('home.products',{
             url: "/products",
             views: {
                'products@':{
                    template: "<products></products>",
                    controller: function($scope, $sessionStorage){
                        $sessionStorage.homeContent = false;
                    }
                }
            }
        })
            .state('logIn.register',{
             url: "/register",
             views: {
                'register@':{
                    template: "<register></register>"
                }
            }
        })
            .state('logIn.accountEmail',{
                url:'/accountEmail',
                views: {
                    'accountEmail@':{
                        template: '<account-email></account-email>'
                    }
                }
            })
            .state('logIn.accountEmail.activateAccount',{
                url: "/activateAccount",
                views: {
                    'activateAccount@':{
                        template: "<activate-account></activate-account>"
                    }
                }
            })
            .state('sensorsHome',{
             url: "/sensorsHome",
             views: {
                'sensorsHome@':{
                    template: "<sensors-home></sensors-home>",
                    controller: function($scope, SENSOR_TYPE, $location, $localStorage, $sessionStorage){
                        SENSOR_TYPE.TITLE = "Home";
                        $sessionStorage.home = true;
                        $sessionStorage.editLoc = false;
                        if(( (!$localStorage.password && !$localStorage.email) && ($localStorage.email != 0 && $localStorage.password != 0)) || (!$sessionStorage.email && !$sessionStorage.password)){
                            $location.path('/logIn')
                        } 
                    }
                }
            }
        })

            .state('settings',{
             url: "/settings",
             views: {
                'settings@':{
                    template: "<settings></settings>",
                    controller: function($scope, $location, $localStorage, $sessionStorage){
                        if(($sessionStorage.email && $sessionStorage.password)|| ($localStorage.password && $localStorage.email)){
                            $location.path('/settings')
                        }else
                        if((!$localStorage.password && !$localStorage.email) || (!$sessionStorage.email && !$sessionStorage.password)){
                            $location.path('/logIn')
                        }
                    }
                }
            }
        })

            .state('sensorsHome.distance',{
             url: "/distance",
             views: {
                'distance@':{
                    template: "<distance></distance>",
                    controller: function($scope, SENSOR_TYPE, $sessionStorage, $localStorage, $location){
                        SENSOR_TYPE.ID = "33";
                        SENSOR_TYPE.OUT_OF_RANGE = "401";
                        SENSOR_TYPE.TITLE = "Distance";
                        $sessionStorage.home = false;
                    }
                }
            }
            })

            .state('sensorsHome.temperature',{
             url: "/temperature",
             views: {
                'temperature@':{
                    template: "<temperature></temperature>",
                    controller: function($scope, SENSOR_TYPE, $sessionStorage, $localStorage, $location){
                        SENSOR_TYPE.ID = "31";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Temperature";
                        $sessionStorage.home = false;
                    }
                }
            }
            })

            .state('sensorsHome.electricalCurrent',{
             url: "/electricalCurrent",
             views: {
                'electricalCurrent@':{
                    template: "<electrical-current></electrical-current>",
                    controller: function($scope, SENSOR_TYPE, $sessionStorage, $localStorage, $location){
                        SENSOR_TYPE.ID = "35";
                        SENSOR_TYPE.TITLE = "Electrical Current";
                        $sessionStorage.home = false;
                    }
                }
            }
            })

            .state('sensorsHome.airQuality',{
             url: "/airQuality",
             views: {
                'airQuality@':{
                    template: "<air-quality></air-quality>",
                    controller: function($scope, SENSOR_TYPE, $sessionStorage, $localStorage, $location){
                        SENSOR_TYPE.ID = "34";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Air Quality";
                        $sessionStorage.home = false;
                    }
                }
            }
            })
            .state('sensorsHome.vibration',{
                url: "/vibration",
                views: {
                   'vibration@':{
                       template: "<vibration></vibration>",
                       controller: function($scope, SENSOR_TYPE, $sessionStorage, $localStorage, $location ){
                        SENSOR_TYPE.ID = "37";
                        SENSOR_TYPE.TITLE = "Vibrations";
                        $sessionStorage.home = false;
                   }
                }
               }
               })
            .state('sensorsHome.editLocation', {
                url: "/editLocation",
                views: {
                    'editLocation@':{
                        template: "<edit-location></edit-location>",
                        controller: function($scope, $localStorage, $location, $sessionStorage){
                            $sessionStorage.editLoc = true;
                            $sessionStorage.home = false;
            
                        }
                    }
                }
            })

        }
    ]);
}());
