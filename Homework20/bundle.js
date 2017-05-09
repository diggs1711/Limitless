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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
'use strict';

    var Player = __webpack_require__(0);
    var Board = __webpack_require__(2);
    var pubSub = __webpack_require__(5);
    var scoreboard = __webpack_require__(6);
    var PlayerControls = __webpack_require__(7);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function() {

    var Cell = __webpack_require__(3);
    var scoreboard = __webpack_require__(6)

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
            this.currentPlayer = this.players[1] === this.getCurrentPlayer() ? this.players[0] : this.players[1];
        }


        module.exports = playerControls;
})();


/***/ })
/******/ ]);