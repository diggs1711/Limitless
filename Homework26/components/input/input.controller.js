;
(function() {

    var inputController = function($scope, listService, local) {

        $scope.onClickAdd = function() {

            var curr = local.get("currentItemId") || 0;
            var newId = curr + 1;

            var newItem = {
                id: newId,
                name: $scope.name,
                complete: false
            };

            $scope.name = '';
            listService.updateTodos(newItem);
        };

    };

    app.controller("inputController", ['$scope', 'listService','localStorageService', inputController]);

})();
