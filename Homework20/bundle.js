/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function() {

    var Disc = __webpack_require__(4);
    var pubSub = __webpack_require__(5);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
'use strict';

    var Player = __webpack_require__(0);
    var Board = __webpack_require__(2);
    var pubSub = __webpack_require__(5);
    var PlayerControls = __webpack_require__(7);
    var referee = __webpack_require__(8);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function() {

    var Cell = __webpack_require__(3);
    var scoreboard = __webpack_require__(6)

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
      this.valueArray[cell.x][cell.y] = cell.colour;
    }

    module.exports = board;
})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function() {

    var pubSub = __webpack_require__(5);

    var cell = function() {
        this.x = 0;
        this.y = 0;
        this.hasDisc = false;
        this.ele = null;
        this.colour = "";
    };

    cell.prototype.init = function() {
        this.ele = document.createElement("td");
        this.ele.className = "board--cell";
        this.initEvents();
    };

    cell.prototype.initEvents = function() {
        var me = this;
        this.ele.addEventListener("click", me.cellSelected.bind(me));
    };

    cell.prototype.cellSelected = function() {

        if (!this.hasDisc) {
            pubSub.publish("cellSelected", this);
        } else {
            alert("Cell Selected already!");
        }

    };

    module.exports = cell;

})();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function() {


    var disc = function(colour) {
      this.colour = colour || "";
    };

    module.exports = disc;
})();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function() {

        var pubSub = {
            events: [],

            publish: function(event, data) {
                this.events.map(function(e) {
                    if (e.name === event) {
                        e.fn.call(e.scope, data);
                    }
                });
            },

            subscribe: function(event, fn, scope) {

                var e = {
                    name: event,
                    fn: fn || null,
                    scope: scope || this
                };

                this.events.push(e);

            }


        };

    module.exports = pubSub;
})();


/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function() {

  var scoreboard = {
    playerTurn: null,


    getCurrentPlayer: function() {
      return this.playerTurn;
    },

    setCurrentPlayer: function(player) {
      this.playerTurn = player;
    },

    changePlayer: function() {
      
    }



  };

  module.exports = scoreboard;

})();


/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function() {

        var playerControls = function() {
            this.players = [];
            this.currentPlayer = null;
        };

        playerControls.prototype.getCurrentPlayer = function() {
          return this.currentPlayer;
        };

        playerControls.prototype.setCurrentPlayer = function(player) {
          this.currentPlayer = player;
        };

        playerControls.prototype.playerTurnTaken = function(cell) {
            this.currentPlayer.insertDisc(cell);
            this.currentPlayer = this.switchPlayer();
        };

        playerControls.prototype.switchPlayer = function() {
          return this.players[1] === this.getCurrentPlayer() ? this.players[0] : this.players[1];
        };

        module.exports = playerControls;
})();


/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function() {

    var referee = function(board) {
      this.redPlayerScore = 0;
      this.yellowPlayerScore = 0
      this.boardToReferee = board;
      this.gameOver = false;
    };

    referee.prototype.checkGameStatus = function(player, cell) {
        var r = this.checkVertical(player, cell);
        this.checkHorizontal(player, cell);
    };

    referee.prototype.checkVertical = function(player, cell) {
        var c = player.colour;

        for(i = 0; i < 5; i++) {
          console.log(this.boardToReferee.valueArray);
          for(j=0; j< 8; j++) {
              if(this.boardToReferee.valueArray[i][j] == c &&
                this.boardToReferee.valueArray[i + 1][j] == c &&
                this.boardToReferee.valueArray[i + 2][j] == c &&
              this.boardToReferee.valueArray[i +  3][j] == c) {
                alert("player " + player.colour + " wins!");
                this.gameOver = true;
              }
          }
        }

    };

    referee.prototype.checkHorizontal = function(player, cell) {

    };


    module.exports = referee;


})();


/***/ })
/******/ ]);