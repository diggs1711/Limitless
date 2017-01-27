(function(exports) {
  var possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_';

  exports.generateRandomString = function(min, max) {
    var randNum = this.getRandomNumber(min, max);
    var result = [];

    for (var i = 0; i < randNum; i++) {
        result.push(this.getRandomCharacter());
    }
    return result.join('');
  };

  exports.getRandomNumber = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  };

  exports.getRandomCharacter = function() {
    return possibleCharacters.charAt(this.getRandomNumber(0, this.possibleCharacters.length));
  }
})(this.stringGeneratorControl = {});
