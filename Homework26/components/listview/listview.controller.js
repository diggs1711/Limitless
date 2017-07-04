;(function() {

  var listViewController = function($scope, af, local, listService) {

    $scope.init = function() {
        $scope.name = af.name;
        $scope.initTodoArray();
    }

    $scope.initTodoArray = function() {
        $scope.todos = listService.todos;
    };

    $scope.onComplete = function(id) {

        listService.todos.forEach(function(todo, index) {
            if (todo.id === id) {
                todo.complete = true;
                local.set("listItems", $scope.todos);
            };
        });

    };

    $scope.$on('updateListView', function() {
      $scope.todos = listService.todos;
    })

    $scope.clear = function() {
        listService.clearCompleteItems();
    };

    $scope.init();
  };

  app.controller("listViewController", ['$scope', 'accountDataModel', 'localStorageService','listService', listViewController])
})();
