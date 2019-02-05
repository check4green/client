(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3", "bw.paging", "w11k.angular-seo-header"])
    .constant('SENSOR_TYPE', {
        'ID': '0',
        'OUT_OF_RANGE': '0',
        'TITLE': '0'
    });
    app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", 
               function($stateProvider, $urlRouterProvider, $locationProvider){
//                $locationProvider.html5Mode(true);
                $urlRouterProvider.otherwise('/home')
                   $stateProvider
            .state("home",{
             url:"/home",
             data:
             {
                head: 
                {
                    title: 'Check4Green',
                    keywords: ["check4green home page", "iot platform", "smart monitoring", "sensor housing"],
                    description: "IoT based hardware and software solutions integrated with LTE and LPWAN technologies such as: SIGFOX, LoRA and NB-IOT.",
                    robots: "index, follow",
                    canonical: 'https://www.check4green.com/home'
                }
             },
             views: {
                'home@':{
                    template: "<home></home>",
                    controller: function($sessionStorage){
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
             data:
             {
                head: 
                {
                    title: 'Contact',
                    keywords: ["check4green informations", "contact"],
                    description: "If you have further questions, contact us!",
                    robots: "index, follow",
                    canonical: 'https://www.check4green.com/contact'
                }
             },
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
             data: 
             {
                 head:
                 {
                     title: 'About us',
                     keywords: ["about check4green", "Startup", "Swiss Integrated Services Petrosani"],
                     description: "Startup founded in 2016 in Petrosani, Romania by Swiss Integrated Services in partnership with Jiu Valley Sensor Ventures.",
                     robots: "index, follow",
                     canonical: 'https://www.check4green.com/home/aboutUs'
                 }
             },
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
             data: 
             {
                 head: 
                 {
                    title: 'Pricing',
                    keywords: ["sensors prices", "pricing", "gateways prices", "android aplication", "distance sensor", "temperature sensor", 
                                "air quality sensor", "electrical current sensor", "vibration sensor"],
                    description: "Find out the prices of our products.",
                    robots: "index, follow",
                    canonical: 'https://www.check4green.com/home/pricing'
                 }
             },
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
             data:
             {
                 head: 
                 {
                     title: 'Technology',
                     keywords: ["lora", "network server", "web application", "technology", "LTE", "LPWAN", "SIGFOX", "NB-IOT"],
                     description: "Our products and services are based on LoRA technology to help provide top class solutions, compatible with the latest trends in the IoT field.",
                     robots: "index, follow",
                     canonical: 'https://www.check4green.com/home/technology'
                 }
             },
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
             data: 
             {
                head: 
                {
                    title: 'Products',
                    keywords: ["smart sensors", "monitoring platform", "end to end iot platform", "products", "iot"],
                    description: "Find out what products we can offer you",
                    robots: "index, follow",
                    canonical: 'https://www.check4green.com/home/products'
                }
             },
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
                    controller: function($location, $localStorage, $sessionStorage, $rootScope){
                        if(( (!$localStorage.password && !$localStorage.email) && ($localStorage.email != 0 && $localStorage.password != 0)) && (!$sessionStorage.email && !$sessionStorage.password)){
                            $location.path('/logIn')
                        }
                        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                            if(toState.name == 'sensorsHome'){
                                $location.path('sensorsHome/sensors')
                            }
                          });
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
                        if(( (!$localStorage.password && !$localStorage.email) && ($localStorage.email != 0 && $localStorage.password != 0)) && (!$sessionStorage.email && !$sessionStorage.password)){
                            $location.path('/logIn')
                        }
                    }
                }
            }
        })
        .state('sensorsHome.sensors',{
            url: "/sensors",
            views: {
               'gridSensors@':{
                   template: "<grid-sensors></grid-sensors>",
                   controller: function(SENSOR_TYPE, $sessionStorage){
                       SENSOR_TYPE.TITLE = "Sensors";
                       $sessionStorage.home = true;
                   }
               }
           }
           })
            .state('sensorsHome.distance',{
             url: "/distance",
             
             views: {
                'distance@':{
                    template: "<distance></distance>",
                    controller: function(SENSOR_TYPE, $sessionStorage){
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
                    controller: function(SENSOR_TYPE, $sessionStorage){
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
                    controller: function(SENSOR_TYPE, $sessionStorage){
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
                    controller: function(SENSOR_TYPE, $sessionStorage){
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
                       controller: function(SENSOR_TYPE, $sessionStorage){
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
                        controller: function($sessionStorage){
                            $sessionStorage.editLoc = true;
                            $sessionStorage.home = false;
            
                        }
                    }
                }
            })
           
        }
    ]);
}());
