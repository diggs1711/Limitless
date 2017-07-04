;(function() {

    var input = function() {

      return {
        templateUrl: './directives/input/todo-input.html',
        restrict: 'E'
      };

    };

    app.directive("todoInput", input);
})();
