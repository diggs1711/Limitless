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
