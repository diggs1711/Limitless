;
(function() {

    var listItems = function() {

        return {
            templateUrl: './components/listview/listview.html',
            restrict: 'E',
            controller: 'listViewController'
        };
    };

    app.directive('todoList', listItems);
})();
