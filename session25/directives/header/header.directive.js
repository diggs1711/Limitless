;(function() {

    var header = function() {

      return {
        restrict: 'E',
        templateUrl: './directives/header/header.html'
      };
    };

    app.directive("header", header);
})();
