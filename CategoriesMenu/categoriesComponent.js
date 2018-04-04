(function(){
    'use strict';
    var app = angular.module("sensorApp");

    app.component('categories', {
        templateUrl: '/CategoriesMenu/categoriesIndex.html',
        controller: 'categoriesCtrl',
        controllerAs: 'vm'
    });
}());