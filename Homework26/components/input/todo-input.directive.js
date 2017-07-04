;(function() {

    var input = function() {

      return {
        templateUrl: './components/input/todo-input.html',
        restrict: 'E',
        controller: 'inputController'
      };

    };

    app.directive("todoInput", input);
})();
