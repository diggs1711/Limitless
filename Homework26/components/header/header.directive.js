;(function() {

    var header = function() {

      return {
        restrict: 'E',
        templateUrl: './components/header/header.html'
      };
    };

    app.directive("header", header);
})();
