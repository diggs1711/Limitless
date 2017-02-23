(function() {
    'use strict';

    var menuItem = require('./menu.item.js');

    var data = [
      'home', 'contact us', 'about us', 'other'
    ];

    var menu = {
      ele: null,
      data: null,
      menuItem: [],

      init: function(){
        this.initEle();
        this.initEvent();

      },
      initEle: function(){
        var d;
        var mi;
        for(var i=0, ln = this.data.length; i < ln; i++) {
          d = this.data[i];
          mi = menuItem({
            data: d
          });

          this.menuItem.push(mi);
        }
      },

      initEvent: function() {

      }
    };


    module.exports = menu;
})();
