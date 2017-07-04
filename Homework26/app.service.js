(function() {

    app.factory("listService", ['$rootScope', 'localStorageService', function($rootScope, local) {

        var listService = {};
        listService.todos = [];

        listService.init = function() {
            this.todos = local.get("listItems") || [];
        };

        listService.updateTodos = function(newItem) {
            this.todos.push(newItem);
            this.updateLocalStorageItems();
            this.updateCurrentItemId(newItem.id);
            $rootScope.$broadcast('updateListView');
        };

        listService.updateLocalStorageItems = function() {
            var self = this;
            local.set("listItems", self.todos);
        };

        listService.updateCurrentItemId = function(newId) {
            local.set("currentItemId", newId);
        };

        listService.clearCompleteItems = function() {

            this.todos = this.todos.filter(function(todo) {
                return !todo.complete
            });

            listService.updateLocalStorageItems();
            $rootScope.$broadcast('updateListView');
        };

        listService.init();
        return listService;
    }]);

})();
