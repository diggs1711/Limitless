app.controller('inputController', ['$rootScope', '$scope', 'accountDataModel', '$routeParams', 'localStorageService', function(rs, $scope, af, rp, local) {

    $scope.init = function() {
        this.id = 0;
        $scope.name = af.name;
        $scope.isNameValid = true;
        rs.todos = [];
        $scope.initTodoArray();

    }

    $scope.initTodoArray = function() {
      local.keys().forEach(function(key) {
          rs.todos.push(local.get(key));
      });
    }

    $scope.onClickDel = function(id) {

        rs.todos.forEach(function(todo, index) {
            if (todo.id === id) {
                console.log("DEleting");
                local.remove(id);
                rs.todos.splice(index, 1);
            };
        });

    };

    $scope.onClickAdd = function() {
        var self = this;

        var newItem = {

            id: self.id,

            name: $scope.name,

            status: 'outstanding',

            age: 10 + self.id * 23

        };
        $scope.todos.push(newItem);
        local.set(self.id, newItem);
        $scope.name = '';
        self.id++;
        rs.todos = $scope.todos;
    };

    $scope.$watch(toWatchName, afterChangeName);
    $scope.$watch(toWatchTodos, afterChangeTodos, true);

    function toWatchName() {
        return $scope.name;
    }

    function afterChangeName(newValue, oldValue) {
        $scope.isNameValid = af.isNameValid(newValue);
    };

    function toWatchTodos() {
        return $scope.todos;
    };

    function afterChangeTodos(newValue, oldValue) {

    };


    $scope.init();

}]);
