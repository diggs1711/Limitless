app.controller('redController', ['$rootScope', '$scope', 'accountDataModel', '$routeParams', function(rs, $scope, dm, rp) {

    var all = rs.todos;

    var id = rp.id;

    $scope.item = findById(id);

    function findById(id) {
        for (var i = 0; i < all.length; i++) {

            if (all[i].id == id) {

                return all[i];

            }

        }

    }

    $scope.bar = 3e8;

}]);
