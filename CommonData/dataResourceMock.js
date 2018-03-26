
(function () {
    "use strict";
   var app = angular.module("dataResourceMock", ["ngMockE2E"]);
    app.run(function ($httpBackend) {
        var dashboards=[
           { 
            "dashboardId":1,
            "sensors":"" ,   
           }];
        
		var sensors=[
        {
            "ID": 1,
            "code": "HMD110", 
            "productionDate":"20.01.2018",
            "uploadInterval":"1h",
            "batchSize":"1",
            "email":"stefan.triohin@gmail.com"
        },
        {                
            "ID": 2,
            "code": "HMD110", 
            "productionDate":"21.01.2018",
            "uploadInterval":"1h",
            "batchSize":"1",
            "email":"mihai.arad@yahoo.com",
         },
         {
             "ID": 3,
             "code": "HMD110", 
             "productionDate":"22.01.2018",
             "uploadInterval":"1h",
             "batchSize":"1",
             "email":"andrei.sabau@gmail.com",
          },
         {
             "ID": 4,
             "code": "HMD110", 
             "productionDate":"22.01.2018",
             "uploadInterval":"1h",
             "batchSize":"1",
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
     "unitOfMeasure" : "°C",
    },
    {"typeId": 2,
     "code": "HMD110",
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
     "unitOfMeasure" : "°C",
    },
    {"typeId": 3,
     "code": "HMD110",
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
     "unitOfMeasure" : "°C",
    },
    {"typeId": 4,
     "code": "HMD110",
     "description":"descr",
     "minValue":"0 °C",
     "maxValue":"100 °C",
     "measureId":"1",
     "multiplier":"1",
     "unitOfMeasure" : "°C",
    }];
        
var measurements=[
    {
     "measureId": 1,
     "unitOfMeasure" : "°C",
     "description" : "descr1",
    },
    {
     "measureId": 2,
     "unitOfMeasure" : "°C",
     "description" : "descr2",
    },
    {
     "measureId": 3,
     "unitOfMeasure" : "°C",
     "description" : "descr2"
    },
    {
     "measureId": 3,
     "unitOfMeasure" : "°C",
     "description" : "descr2"
    }];

       var dataSource = [
            {
               days : "Monday",
               value : 11
                }, 
            {
               days : "Tuesday",
               value : 21
            }, 
            {
              days : "Wednesday",
              value : 1
              },
            {
               days : "Thursday",
               value : 32
             },
            {
               days : "Friday",
               value : 27
            }, 
            {
                 days : "Saturday",
                 value : 14
             },
            {
               days : "Sunday",
               value : 23
             }]; 

        var chartUrl="/api/charts"
        $httpBackend.whenGET(chartUrl).respond(dataSource);
     var dashboardUrl="/api/dashboards"
     $httpBackend.whenGET(/\/api\/dashboards\?page=\d{1,3}\&pageSize=\d{1,3}/).respond(function (method, url, data, headers, params){
   var take =parseInt(params.pageSize);
    var skip =parseInt(params.page) * take;

    var filteredItems = dashboards;
    var result = filteredItems.slice(skip, skip + take);
    var totalCount = filteredItems.length;

    var paginationHeader = angular.toJson({ totalCount: totalCount });
    return [200, result, { 'X-Pagination': paginationHeader }];
});
        
     var sensorUrl="/api/sensors"
    $httpBackend.whenGET(/\/api\/sensors\?page=\d{1,3}\&pageSize=\d{1,3}/).respond(function (method, url, data, headers, params){
   var take = parseInt(params.pageSize);
    var skip =parseInt(params.page) * take;

    var filteredItems = sensors;
    
    var result = filteredItems.slice(skip, skip + take);
    var totalCount = filteredItems.length;

    var paginationHeader = angular.toJson({ totalCount: totalCount });
    return [200, result, { 'X-Pagination': paginationHeader }];
});
        
     var typeUrl="/api/types"
    $httpBackend.whenGET(/\/api\/types\?page=\d{1,3}\&pageSize=\d{1,3}/).respond(function (method, url, data,headers, params){
   var take = parseInt(params.pageSize);
    var skip = parseInt(params.page) * take;

    var filteredItems = types;
    var result = filteredItems.slice(skip, skip + take);
    var totalCount = filteredItems.length;

    var paginationHeader = angular.toJson({ totalCount: totalCount });
    return [200, result, { 'X-Pagination': paginationHeader }];
});
        
     var measurementUrl="/api/measurements"
     $httpBackend.whenGET(/\/api\/measurements\?page=\d{1,3}\&pageSize=\d{1,3}/).respond(function (method, url, data,headers, params){
   var take = parseInt(params.pageSize);
    var skip =parseInt(params.page) * take;

    var filteredItems = measurements;
    var result = filteredItems.slice(skip, skip + take);
    var totalCount = filteredItems.length;

    var paginationHeader = angular.toJson({ totalCount: totalCount });
    return [200, result, { 'X-Pagination': paginationHeader }];
});
        
$httpBackend.whenPOST(sensorUrl).respond(function (method, url, data){
    var values=angular.fromJson(data);
    sensors.push(values);
    return[200, values, {}];
});
        
var editingRegex1= new RegExp(sensorUrl+ "/[0-9][0-9]*", '');
$httpBackend.whenGET(editingRegex1).respond(function (method, data, url){
    var sensor={"ID": 0};
    var parameters=url.split('/');
    var length=parameters.length;
    var key=parameters[length-1];
    if(key> 0 ){
        for (var i=0; i<sensors.length; i++){
            if(sensors[i].ID==key){
				sensor=sensors[i];
				break;
            }
        }
    }
    return [200, sensor, {}];
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


    });
}());  