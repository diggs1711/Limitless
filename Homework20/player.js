(function() {

    var Disc = require('./disc.js');


    var player = function(name, colour) {
        this.name = name;
        this.colour = colour;
    };

    player.prototype.insertDisc = function(cell) {
        var disc = new Disc(this.colour);
        cell.ele.classList.add(disc.colour);
        cell.hasDisc = true;
    };

    module.exports = player;
})();
