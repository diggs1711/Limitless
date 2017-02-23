(function() {
    'use strict';

    var util = require('./util.js');

    function menuItem(config){
      config = config || [];

      var o = {
        ele: null,
        data: config.data,
        init: function(){
          this.initEle();
          this.initEvent();

        },
        initEle: function(){
          this.ele = util.make('div', 'app__menu__item');
        },

        initEvent: function() {

        }
      };

      o.init();

      return o;
    };

    module.exports = menuItem;

})();
