;(function() {

  var main = function() {

    return {
      templateUrl: './components/content/main.html',
      restrict: 'E'
    };

  };

  app.directive("mainContent", main);
})();
