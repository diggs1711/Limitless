;!function() {
    'use strict';

    var util = {
      make: function(type, cls){
        var ele = document.createElement(type);
        ele.className = cls;
        return ele;
      }

    };

    module.exports = util;
}()
