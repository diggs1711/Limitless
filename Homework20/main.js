(function() {
'use strict';

    var Player = require('./player.js');
    var Board = require('./board.js');
    var pubSub = require('./pubSub.js');
    var scoreboard = require('./scoreboard.js');
    var PlayerControls = require('./playerControls.js');

    var p1 = new Player("p1", "yellow");
    var p2 = new Player("p2", "red");
    var board = new Board();
    var controls = new PlayerControls();

    controls.players.push(p1);
    controls.players.push(p2);

    controls.setCurrentPlayer(p1);
    
    board.init();
    board.createBoard();

    pubSub.subscribe("cellSelected", controls.playerTurnTaken, controls);

})();
