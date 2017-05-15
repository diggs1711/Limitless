(function() {

    var Disc = require('./disc.js');
    var pubSub = require('./pubSub.js');

    var player = function(name, colour) {
        this.name = name;
        this.colour = colour;
    };

    player.prototype.insertDisc = function(cell) {
        var disc = new Disc(this.colour);
        this.addDiscToBoard(disc, cell);
        pubSub.publish("updateBoard", cell);
        pubSub.publish("checkIfWinner", cell);
    };

    player.prototype.addDiscToBoard = function(d, c) {
      c.ele.classList.add(d.colour);
      c.hasDisc = true;
      c.colour = this.colour;
    }

    module.exports = player;
})();
