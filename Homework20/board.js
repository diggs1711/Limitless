(function() {

    var Cell = require('./cells.js');
    var scoreboard = require('./scoreboard.js')

    var board = function() {
      this.width = 8;
      this.height = 8;
      this.ele = null;
    };

    board.prototype.init = function() {
      this.ele = document.querySelector('.board');
    }

    board.prototype.createBoard = function() {

      for(var i = 0; i < this.height; i++) {
        var row = document.createElement("tr");
        for(var j = 0; j < this.width; j++) {
            var cell = new Cell();
            cell.init();
            cell.x = i;
            cell.y = j;

            row.appendChild(cell.ele);
        }
        this.ele.appendChild(row);
      }

    };

    module.exports = board;
})();
