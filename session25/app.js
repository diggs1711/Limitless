var app = null;

(function(angular) {
    'use strict';

    app = angular.module('limitlessTestApp', ['ngRoute', 'LocalStorageModule']);

    app.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "directives/content/main.html",
            controller: 'inputController',
        });

    });
    
})(angular);
