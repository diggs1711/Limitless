;
(function() {

    var listItems = function() {

        return {
            templateUrl: './directives/listview/listview.html',
            restrict: 'E'
        };
    };

    app.directive('todoList', listItems);
})();
