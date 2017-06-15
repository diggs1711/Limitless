app.controller('inputController', ['$rootScope', '$scope', 'accountDataModel', '$routeParams', 'localStorageService', function(rs, $scope, af, rp, local) {

    $scope.name = af.name;

    $scope.isNameValid = true;
    rs.todos = [];

    local.keys().forEach(function(key) {
        rs.todos.push(local.get(key));
    });



    var id = 0;



    $scope.onClickDel = function(id) {

        console.log('i want to remove todo item that has id: ' + id);

        rs.todos.forEach(function(todo, index) {
            if (todo.id === id) {
                console.log("DEleting");
                local.remove(id);
                rs.todos.splice(index, 1);
            };
        });

    };



    $scope.onClickAdd = function() {

        var newItem = {

            id: id,

            name: $scope.name,

            status: 'outstanding',

            age: 10 + id * 23

        };
        $scope.todos.push(newItem);
        local.set(id, newItem);
        $scope.name = '';
        id++;
        rs.todos = $scope.todos;
    };



    $scope.goToAnotherPage = function() {

        console.log('go....');

    };



    $scope.$watch(toWatchName, afterChangeName);

    $scope.$watch(toWatchTodos, afterChangeTodos, true);



    /**

     *
     * @param {}

     */

    function toWatchName() {
        return $scope.name;
    }

    function afterChangeName(newValue, oldValue) {

        $scope.isNameValid = af.isNameValid(newValue);

    }



    /**

     *
     * @param {}

     */

    function toWatchTodos() {
        return $scope.todos;
    }

    function afterChangeTodos(newValue, oldValue) {

        console.log('######');

        console.log(newValue);

    }

}]);
