var app = null;

(function(angular) {
    'use strict';

    app = angular.module('limitlessTestApp', ['ngRoute', 'LocalStorageModule']);

    app.config(function($routeProvider) {

        $routeProvider

            .when("/", {

            templateUrl: "main.html",

            controller: 'inputController',


        })

        .when("/red", {

            templateUrl: "red.html",

            controller: 'redController'

        });

    });

})(angular);
