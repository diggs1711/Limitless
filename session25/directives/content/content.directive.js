;(function() {

  var main = function() {

    return {
      templateUrl: './directives/content/main.html',
      restrict: 'E'
    };

  };

  app.directive("mainContent", main);
})();
