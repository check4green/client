(function(){
    "use strict";
    var app = angular.module("sensorApp", ["ui.router", "ngStorage", "d3", "bw.paging", "w11k.angular-seo-header", "oc.lazyLoad"])
                    .constant('SENSOR_TYPE', {
                                'ID': '0',
                                'OUT_OF_RANGE': '0',
                                'TITLE': '0'
                            });
    app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider","$ocLazyLoadProvider",
               function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider){
                $locationProvider.html5Mode(true);
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Home/homeStyle.css',
                        'Home/imgGalleryCtrlStyle.css',
                        'Home/HomeContent/cardContentStyle.css',
                        '/Home/HomeContent/homeContentCtrl.js',
                        '/Home/HomeContent/homeContentDirective.js',
                        '/Home/homeCtrl.js',
                        '/Home/homeComponent.js',
                        'Home/RequestDemo/requestDemo.css',
                        '/Home/RequestDemo/requestDemoCtrl.js',
                        '/Home/RequestDemo/requestDemoComponent.js',
                        '/Home/scriptIndex.js',
                        'Calculator/calculatorDirective.js',
                        'Calculator/rangeBar.css',
                        'textHeader/AboutUs/aboutUsComponent.js',
                        'textHeader/AboutUs/aboutUsCtrl.js',
                        'textHeader/Pricing/pricingComponent.js',
                        'textHeader/Pricing/pricingCtrl.js',
                        'textHeader/Products/productsComponent.js',
                        'textHeader/Products/productsCtrl.js',
                        'textHeader/Technology/technologyComponent.js',
                        'textHeader/Technology/technologyCtrl.js',
                        'Autentification/Service/autentificationService.js'
                    ])
                }]
            }
        })
            .state('logIn',{
             url: "/logIn",
             views: {
                'logIn@':{
                    template: "<log-in></log-in>"
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Autentification/Service/autentificationService.js',
                        'Autentification/LogIn/logInComponent.js',
                        'Autentification/LogIn/logInCtrl.js',
                        'Autentification/LogIn/logInStyle.css',
                    ])
                }]
            }
        })
            .state('forgotPassword',{
             url: "/forgotPassword",
             views: {
                'forgotPassword@':{
                    template: "<forgot-password></forgot-password>"
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Autentification/ForgotPassword/forgotPasswordStyle.css',
                        'Autentification/ForgotPassword/forgotPasswordComponent.js',
                        'Autentification/ForgotPassword/forgotPasswordCtrl.js',
                        'Autentification/Service/autentificationService.js'


                    ])
                }]
            }
        })
            .state('resetPassword',{
             url: "/resetPassword",
             views: {
                'resetPassword@':{
                    template: "<reset-password></reset-password>"
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Autentification/ForgotPassword/resetPassword/resetPasswordStyle.css',
                        'Autentification/ForgotPassword/resetPassword/resetPasswordComponent.js',
                        'Autentification/ForgotPassword/resetPassword/resetPasswordCtrl.js',
                        'Autentification/Service/autentificationService.js'
                    ])
                }]
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Autentification/Contact/contactStyle.css',
                        'Autentification/Contact/contactComponent.js',
                        'Autentification/Contact/contactCtrl.js',
                        'Autentification/Service/autentificationService.js'
                    ])
                }]
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'textHeader/AboutUs/aboutUsStyle.css'
                    ])
                }]
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'textHeader/Pricing/pricingStyle.css'
                    ])
                }]
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'textHeader/Technology/technologyStyle.css'
                    ])
                }]
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
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'textHeader/Products/productsStyle.css',
                        'Home/homeStyle.css',

                    ])
                }]
            }
        })
            .state('logIn.register',{
             url: "/register",
             views: {
                'register@':{
                    template: "<register></register>"
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Autentification/Register/registerStyle.css',
                        'Autentification/Register/registerComponent.js',
                        'Autentification/Register/registerCtrl.js',
                        'Autentification/Service/autentificationService.js'
                    ])
                }]
            }
        })
            .state('accountEmail',{
                url:'/accountEmail',
                views: {
                    'accountEmail@':{
                        template: '<account-email></account-email>'
                    }
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                        'Autentification/ActivateAccount/accountEmailComponent.js',
                        'Autentification/ActivateAccount/accountEmailCtrl.js',
                        'Autentification/ForgotPassword/forgotPasswordStyle.css',
                        'Autentification/Service/autentificationService.js'
                       
                        ])
                    }]
                }
            })
            .state('accountEmail.activateAccount',{
                url: "/activateAccount",
                views: {
                    'activateAccount@':{
                        template: "<activate-account></activate-account>"
                    }
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                        'Autentification/ActivateAccount/activateAccountComponent.js',
                        'Autentification/ActivateAccount/activateAccountCtrl.js',
                        'Autentification/ForgotPassword/resetPassword/resetPasswordStyle.css',
                        'Autentification/Service/autentificationService.js'
                       
                        ])
                    }]
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
                                $location.path('/sensorsHome/networks')
                            }
                          });
                    }
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'sensorsHome/sensorsHomeComponent.js',
                        'sensorsHome/sensorsHomeCtrl.js',
                        'sensorsHome/sensorsHomeStyle.css',
                        'SensorModel/sensorModelStyle.css',
                        'SensorModel/chartDirective.js',
                        'SensorModel/deleteSensorDirective.js',
                        'SensorModel/detailsSensorDirective.js',
                        'SensorModel/editSensorComponent.js',
                        'SensorModel/editSensorCtrl.js',
                        'SensorModel/measurementsDirective.js',
                        'SensorModel/searchDirective.js',
                        'SensorModel/sensorModelCtrl.js',
                        'Home/scriptIndex.js',
                        'sensorsHome/map.js',
                        'Networks/deleteNetworkDirective.js',
                        'Networks/editNetworkDirective.js',
                        'SensorModel/sensorGatewayDirective.js',
                        'sensorsHome/map.css',
                        'SensorModel/sensorModelService.js',
                        'Autentification/Service/autentificationService.js',
                        'Networks/networkService.js',
                        'Gateways/gatewayService.js'

                    ])
                }]
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
            },
            resolve:{
             loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                 return $ocLazyLoad.load([
                     'Autentification/Settings/settingsComponent.js',
                     'Autentification/Settings/settingsCtrl.js',
                     'Autentification/Settings/settingsStyle.css',
                     'Autentification/Service/autentificationService.js'
                 ])
             }]
         }
        })
        .state('sensorsHome.networks', {
            url: '/networks',
            views: {
                'networks@':{
                    template: "<networks></networks>"
                }
            },
            resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Networks/networksComponent.js',
                        'Networks/networksCtrl.js'
                    ])
                }]
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
                       $sessionStorage.gateWay = false;
                       $sessionStorage.sens = true;
                   }
               }
           },
           resolve:{
            loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'sensorsHome/sensorGridComponent.js',
                    'sensorsHome/sensorGridCtrl.js'
                ])
            }]
        }
           })
           .state('sensorsHome.devices', {
               url: "/devices",
               views: {
                   'devices@':{
                       template: "<devices></devices>",
                       controller: function(SENSOR_TYPE){
                            SENSOR_TYPE.TITLE = 'Devices'
                       }
                   }
               },
               resolve: {
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'sensorsHome/devicesComponent.js',
                        'sensorsHome/devicesCtrl.js'
                    ])
                }]
               }
           })
            .state('sensorsHome.distance',{
             url: "/distance",
             
             views: {
                'distance@':{
                    template: "<distance></distance>",
                    controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "1";
                        SENSOR_TYPE.OUT_OF_RANGE = "401";
                        SENSOR_TYPE.TITLE = "Distance";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                    }
                }
            },
            resolve:{
             loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                 return $ocLazyLoad.load([
                     'Sensors/Distance/distanceComponent.js'
                 ])
             }]
         }
            })

            .state('sensorsHome.temperature',{
             url: "/temperature",
             views: {
                'temperature@':{
                    template: "<temperature></temperature>",
                    controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "2";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Temperature";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                    }
                }
            },
            resolve:{
             loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                 return $ocLazyLoad.load([
                     'Sensors/Temperature/temperatureComponent.js'
                 ])
             }]
         }
            })

            .state('sensorsHome.electricalCurrent',{
             url: "/electricalCurrent",
             views: {
                'electricalCurrent@':{
                    template: "<electrical-current></electrical-current>",
                    controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "3";
                        SENSOR_TYPE.TITLE = "Electrical Current";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                    }
                }
            },
            resolve:{
             loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                 return $ocLazyLoad.load([
                     'Sensors/ElectricalCurrent/electricalCurrentComponent.js'
                 ])
             }]
         }
            })

            .state('sensorsHome.airQuality',{
             url: "/airQuality",
             views: {
                'airQuality@':{
                    template: "<air-quality></air-quality>",
                    controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "7";
                        SENSOR_TYPE.OUT_OF_RANGE = "101";
                        SENSOR_TYPE.TITLE = "Air Quality";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                    }
                }
            },
            resolve:{
             loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                 return $ocLazyLoad.load([
                     'Sensors/AirQuality/airQualityComponent.js'
                 ])
             }]
         }
            })
            .state('sensorsHome.vibration',{
                url: "/vibration",
                views: {
                   'vibration@':{
                       template: "<vibration></vibration>",
                       controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "6";
                        SENSOR_TYPE.TITLE = "Vibrations";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                   }
                }
               },
               resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Sensors/Vibration/vibrationComponent.js'
                    ])
                }]
            }
               })
               .state('sensorsHome.pressure',{
                url: "/pressure",
                views: {
                   'pressure@':{
                       template: "<pressure></pressure>",
                       controller: function(SENSOR_TYPE, $sessionStorage){
                        SENSOR_TYPE.ID = "5";
                        SENSOR_TYPE.TITLE = "Pressure";
                        $sessionStorage.home = false;
                        $sessionStorage.gateWay = false;
                        $sessionStorage.sens = true;
                   }
                }
               },
               resolve:{
                loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'Sensors/Pressure/pressureComponent.js'
                    ])
                }]
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
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'sensorsHome/map.js',
                            'sensorsHome/map.css',
                            'sensorsHome/editLocationComponent.js',
                            'sensorsHome/editLocationCtrl.js'
                        ])
                    }]
                }
            })
            .state('sensorsHome.addSensor', {
                url: "/add-sensor",
                views: {
                    'registerSensor@':{
                        template: "<register-sensor></register-sensor>",
                        controller: function($sessionStorage, SENSOR_TYPE){
                            $sessionStorage.register = true;
                            SENSOR_TYPE.TITLE = 'Add a sensor';
                            $sessionStorage.gateWay = false;
            
                        }
                    }
                },
                resolve:{
                 loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                     return $ocLazyLoad.load([
                         'SensorModel/registerSensorComponent.js',
                         'SensorModel/registerSensorCtrl.js'
                     ])
                 }]
             }
                
            })
            .state('sensorsHome.editSensor', {
                url: "/edit-sensor",
                views: {
                    'editSensor@':{
                        template: "<edit-sensor></edit-sensor>",
                        controller: function($sessionStorage, SENSOR_TYPE){
                            SENSOR_TYPE.TITLE = 'Edit sensor';
            
                        }
                    }
                }
                
            })
            .state('sensorsHome.addNetwork', {
                url: '/add-network',
                views:{
                    'registerNetwork@':{
                        template: "<register-network></register-network>"
                    }
                },
                resolve:{
                 loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                     return $ocLazyLoad.load([
                        'Networks/registerNetworkComponent.js',
                        'Networks/registerNetworkCtrl.js',
                     ])
                 }]
             }
            })
            .state('sensorsHome.networkDetails', {
                url:'/network-details',
                views: {
                    'detailsNetwork@': {
                        template: "<details-network></details-network>",
                        controller: function($sessionStorage){
                            $sessionStorage.netDet = true;
                        }
                    }
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                           'Networks/detailsNetworkDirective.js',
                           'sensorsHome/map.js'
                        ])
                    }]
                }
            })
            .state('sensorsHome.addGateway', {
                url: '/add-gateway',
                views:{
                    'registerGateway@':{
                        template: "<register-gateway></register-gateway>"
                    }
                },
                resolve:{
                 loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                     return $ocLazyLoad.load([
                        'Gateways/registerGatewayComponent.js',
                        'Gateways/registerGatewayCtrl.js',
                        'Gateways/gatewayService.js'

                     ])
                 }]
             }
            })
            .state('sensorsHome.gateways', {
                url: '/gateways',
                views:{
                    'gateways@':{
                        template: "<gateway></gateway>",
                        controller: function($sessionStorage){
                            $sessionStorage.gateWay = true;
                            $sessionStorage.sens = false;
                        }
                    }
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                           'Gateways/gatewayComponent.js',
                           'Gateways/gatewayDetailsDirective.js',
                           'Gateways/deleteGatewayDirective.js',
                           'Gateways/editGatewayDirective.js',
                           'Gateways/searchDirective.js',
                           'Gateways/gatewaySensorsDirective.js'
                           
                        ])
                    }]
                }
            })
            .state('sensorsHome.editGateway',{
                url:'/edit-gateway',
                views:{
                    'editgateway@':{
                        template: "<editgateway></editgateway>"
                    }
                },
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                           'Gateways/editGatewayDirective.js',
                           'Gateways/editGatewayCtrl.js',
                           'Gateways/gatewayService.js'
                        ])
                    }]
                }
            })
           
        }
    ]);
}());
