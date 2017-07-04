var app = null;

(function(angular) {
    'use strict';

    app = angular.module('todoApp', ['ngRoute', 'LocalStorageModule']);

    app.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "components/content/main.html",
            controller: 'inputController',
        });

    });

})(angular);
