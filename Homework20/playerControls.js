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
