
(function () {
    "use strict";
   var app = angular.module("dataResourceMock", ["ngMockE2E"]);
    app.run(function ($httpBackend) {
        var dashboards=[

            {"dashboardId":1,
            "sensorId":"1111"} ,
            
            {"dashboardId":2,
            "sensorId":"222"} , 
               
            {"dashboardId":3,
            "sensorId":"3333"} ];
        
		var sensors=[
        {
            "ID": 1,
            "productionDate":"20.01.2018",
            "uploadInterval":"1h",
            "Name":"workSensor",
            "email":"stefan.triohin@gmail.com"
        },
        {                
            "ID": 2,
            "productionDate":"21.01.2018",
            "uploadInterval":"2h",
            "Name":"homeSensor",
            "email":"mihai.arad@yahoo.com",
         },
         {
             "ID": 3,
             "productionDate":"22.01.2018",
             "uploadInterval":"5h",
             "Name":"carSensor",
             "email":"andrei.sabau@gmail.com",
          }];
        
var  types=[
    {"typeId": 1,
     "code": "HMD110", 
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
    },
    {"typeId": 2,
     "code": "HMD110",
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
    },
    {"typeId": 3,
     "code": "HMD110",
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
    }];
      
        

        
var measurements=[
    {
     "measureId": 1,
     "TimeH/Day" : "13:00",
     "Value °C" : "30",
    },
    {
     "measureId": 2,
     "TimeH/Day" : "14:00",
     "Value °C" : "25",
    },
    {
     "measureId": 3,
     "TimeH/Day" : "15:00",
     "Value °C" : "15"
    }];

        
var charts = [
    {"chartsID": 1,
      hours : "01:00",
      value : 11
       },
    {"chartsID": 1,
      hours : "02:00",
      value : 15
       },
    {"chartsID": 1,
      hours : "03:00",
      value : 12
       },
    {"chartsID": 1,
      hours : "04:00",
      value : 17
       },
    {"chartsID": 1,
      hours : "05:00",
      value : 12
       },
    {"chartsID": 1,
      hours : "06:00",
      value : 18
       },
    {"chartsID": 1,
      hours : "07:00",
      value : 15
       },
    {"chartsID": 1,
      hours : "08:00",
      value : 19
       },
    {"chartsID": 1,
      hours : "09:00",
      value : 20
       },
    {"chartsID": 1,
      hours : "10:00",
      value : 21
       },
    {"chartsID": 1,
      hours : "11:00",
      value : 21
       },
    {"chartsID": 1,
      hours : "12:00",
      value :23
       },
        
    {"chartsID": 1,
      hours : "13:00",
      value : 24
       }, 
     {"chartsID": 1,
      hours : "14:00",
      value : 21
     }, 
     {"chartsID": 1,
      hours : "15:00",
      value : 7
      },
     {"chartsID": 1,
      hours : "16:00",
      value : 32
      },
     {"chartsID": 1,
      hours : "17:00",
      value : 27
     }, 
     {"chartsID": 1,
      hours : "18:00",
      value : 14
      },
     {"chartsID": 1,
      hours : "19:00",
      value : 23
      },
     {"chartsID": 1,
      hours : "20:00",
      value : 30
      },
     {"chartsID": 1,
      hours : "21:00",
      value : 16
      },
     {"chartsID": 1,
      hours : "22:00",
      value : 16
      },
     {"chartsID": 1,
      hours : "23:00",
      value : 25
      },
     {"chartsID": 1,
      hours : "24:00",
      value : 14
      },
     
    /*
    {"chartsID": 2,
      days : "Monday",
      value : 21
       }, 
     {"chartsID": 2,
      days : "Tuesday",
      value : 23
     }, 
     {"chartsID": 2,
      days : "Wednesday",
      value : 27
      },
     {"chartsID": 2,
      days : "Thursday",
      value : 29
      },
     {"chartsID": 2,
      days : "Friday",
      value : 25
     }, 
     {"chartsID": 2,
        days : "Saturday",
        value : 23
      },
     {"chartsID": 2,
      days : "Sunday",
      value : 21
      },
     
    
     {"chartsID": 3,
      days : "Monday",
      value : 11
       }, 
     {"chartsID": 3,
      days : "Tuesday",
      value : 21
     }, 
     {"chartsID": 3,
      days : "Wednesday",
      value : 1
      },
     {"chartsID": 3,
      days : "Thursday",
      value : 32
      },
     {"chartsID": 3,
      days : "Friday",
      value : 27
     }, 
     {"chartsID": 3,
        days : "Saturday",
        value : 14
      },
     {"chartsID": 3,
      days : "Sunday",
      value : 23
      }*/];
                   
     var chartUrl="/api/charts"
     $httpBackend.whenGET(chartUrl).respond(charts);
        
     var dashboardUrl="/api/dashboards"
     $httpBackend.whenGET(dashboardUrl).respond(dashboards);
        
     var sensorUrl="/api/sensors"
     $httpBackend.whenGET(sensorUrl).respond(sensors);
        
     var typeUrl="/api/types"
     $httpBackend.whenGET(typeUrl).respond(types);
        
     var measurementUrl="/api/measurements"
     $httpBackend.whenGET(measurementUrl).respond(measurements);
        
$httpBackend.whenPOST(chartUrl).respond(function (method, url, data){
    var newChart=angular.fromJson(data);
    charts.push(newChart);
    return[200, newChart, {}];
});
var editingRegex0= new RegExp(chartUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex0).respond(function (method, data, url){
    var chart={"chartsID": 1};
    var parameters=url.split('/');
    var length=parameters.length;
    var id=parameters[length-1];
    if(id> 1 ){
        for (var a=1; a<charts.length; a++){
            if(charts[a].chartsID==id){
				chart=charts[a];
				break;
            }
        }
    }
    return [200, chart, {}];
});        

$httpBackend.whenPOST(dashboardUrl).respond(function (method, url, data){
    var newDashboard=angular.fromJson(data);
    dashboards.push(newDashboard);
    return[200, newDashboard, {}];
});
var editingRegex= new RegExp(dashboardUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex).respond(function (method, data, url){
    var dashboard={"ID": 0};
    var parameters=url.split('/');
    var length=parameters.length;
    var id=parameters[length-1];
    if(id> 0 ){
        for (var i=0; i<dashboards.length; i++){
            if(dashboards[i].ID==id){
				dashboard=dashboards[i];
				break;
            }
        }
    }
    return [200, dashboard, {}];
});        
        
$httpBackend.whenPOST(sensorUrl).respond(function (method, url, data){
    var newSensor=angular.fromJson(data);
    sensors.push(newSensor);
    return[200, newSensor, {}];
});        
var editingRegex1= new RegExp(sensorUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex1).respond(function (method, data, url){
    var sensor={"ID": 0};
    var parameters=url.split('/');
    var length=parameters.length;
    var id=parameters[length-1];
    if(id> 0 ){
        for (var i=0; i<sensors.length; i++){
            if(sensors[i].ID==id){
				sensor=sensors[i];
				break;
            }
        }
    }
    return [200, sensor, {}];
});
        
$httpBackend.whenPOST(measurementUrl).respond(function (method, url, data){
    var newMeasurement=angular.fromJson(data);
    measurements.push(newMeasurement);
    return[200, newMeasurement, {}];
});
var editingRegex2= new RegExp(measurementUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex2).respond(function (method,  data, url){
    var measurement={"measureId": 0};
    var parameters=url.split('/');
    var length=parameters.length;
    var id=parameters[length-1];
    if(id> 0 ){
        for (var i=0; i<measurements.length; i++){
            if(measurements[i].measureId==id){
                measurement=measurements[i];
				break;
            }
        }
    }
    return [200, measurement, {}];
});
        
$httpBackend.whenPOST(typeUrl).respond(function (method, url,  data){
    var newType=angular.fromJson(data);
    types.push(newType);
    return[200, newType, {}];
});
var editingRegex3= new RegExp(typeUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex3).respond(function (method, data, url){
    var type={"typeId": 0};
    var parameters=url.split('/');
    var length=parameters.length;
    var id=parameters[length-1];
    if(id> 0 ){
        for (var i=0; i<types.length; i++){
            if(types[i].typeId==id){
                type=types[i];
				break;
            }
        }
    }
    return [200, type, {}];
});
        
$httpBackend.whenGET(/Dashboard/).passThrough();        
$httpBackend.whenGET(/Measurements/).passThrough();
$httpBackend.whenGET(/SensorList/).passThrough();
$httpBackend.whenGET(/SensorType/).passThrough();
$httpBackend.whenGET(/Chart/).passThrough();


    });
}());  