
(function(ang){
  'use strict';

  var app = ang.module("myApp",[]);

  app.factory("accountFactory", [funtion() {

        console.log("")
  }]);


  app.controller('inputController', ['$scope', function($scope) {
        $scope.name = "David";

  }]);


})(angular)
