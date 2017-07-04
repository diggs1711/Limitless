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
            status: 'outstanding',
            complete: false,
            age: 10 + self.id * 23
        };

        rs.todos.push(newItem);
        local.set("listItems", rs.todos);
        local.set("currentItemId", newId);
        $scope.name = '';
        rs.todos = $scope.todos;
    };

    $scope.init();

}]);
