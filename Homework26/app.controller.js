app.controller('inputController', ['$rootScope', '$scope', 'accountDataModel', '$routeParams', 'localStorageService', function(rs, $scope, af, rp, local) {

    $scope.init = function() {
        $scope.name = af.name;
        $scope.initTodoArray();
    }

    $scope.initTodoArray = function() {
        rs.todos = local.get("listItems") || [];
    };

    $scope.onComplete = function(id) {

        rs.todos.forEach(function(todo, index) {
            if (todo.id === id) {
                todo.complete = true;
                local.set("listItems", rs.todos);
            };
        });

    };

    $scope.onClickAdd = function() {
        var self = this;
        var curr = local.get("currentItemId") || 0;
        var newId = curr + 1;

        var newItem = {
            id: newId,
            name: $scope.name,
            complete: false
        };

        $scope.updateTodos(newId, newItem);
    };

    $scope.updateTodos = function(newId, newItem) {
      rs.todos.push(newItem);
      $scope.updateLocalStorageItems();
      local.set("currentItemId", newId);
      $scope.name = '';
    };

    $scope.updateLocalStorageItems = function() {
      local.set("listItems", rs.todos);
    }

    $scope.clear = function() {

      rs.todos = rs.todos.filter(function(todo) {
        return !todo.complete
      });

      $scope.updateLocalStorageItems();
    };

    $scope.init();
}]);
