(function() {
'use strict';

    var Player = require('./player.js');
    var Board = require('./board.js');
    var pubSub = require('./pubSub.js');
    var scoreboard = require('./scoreboard.js');
    var PlayerControls = require('./playerControls.js');
    var referee = require('./referee.js');

    var p1 = new Player("p1", "yellow");
    var p2 = new Player("p2", "red");
    var board = new Board(8, 8);
    var controls = new PlayerControls();
    var ref = new referee(board);

    controls.players.push(p1);
    controls.players.push(p2);
    controls.setCurrentPlayer(p1);

    board.init();

    pubSub.subscribe("cellSelected", controls.playerTurnTaken, controls);
    pubSub.subscribe("updateBoard", board.update, board);
    pubSub.subscribe("checkIfWinner", ref.checkGameStatus, ref);
})();
