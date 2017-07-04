app.factory('accountDataModel', [function() {

    var accountDataModel = {};
    accountDataModel.name = '';

    accountDataModel.isNameValid = function(name) {
        return name === 'ian';
    };

    return accountDataModel;
}]);
