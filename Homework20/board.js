(function() {

    var Cell = require('./cells.js');
    var scoreboard = require('./scoreboard.js')

    var board = function(w, h) {
      this.width = w;
      this.height = h;
      this.ele = null;
      this.valueArray = [];
    };

    board.prototype.init = function() {
      this.ele = document.querySelector('.board');
      this.createBoard();
    }

    board.prototype.createBoard = function() {
      console.log(this.height-1)
      for(var i = this.height-1; i >= 0; i--) {
        console.log(i);
        var row = document.createElement("tr");
        this.valueArray[i] = [];

        for(var j = 0; j < this.width; j++) {
            var cell = new Cell();
            cell.init();
            cell.x = i;
            cell.y = j;

            this.valueArray[i][j] = "Empty";
            row.appendChild(cell.ele);
        }
        this.ele.appendChild(row);
      }

    };

    board.prototype.update = function(cell) {
      console.log(cell.x, cell.y);
      this.valueArray[cell.x][cell.y] = cell.colour;
    }

    module.exports = board;
})();
