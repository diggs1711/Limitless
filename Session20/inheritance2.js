(function() {

    var Animal = function() {

        this.move = function() {
            console.log("Moved");
        }
    };


    var wolf = Object.create(Animal.prototype);

})();


var button = (function() {

    function button(config) {
        this.ele = null;
        this.baseClass = '';
        this.content = config.content || '';
    };

    button.prototype.init = function() {
        this.initEle();
        this.initEvents();
    };

    button.prototype.initEle = function() {
        this.ele = document.createElement('a');
        this.ele.className = this.baseClass;
        this.ele.innerText = this.content;
    };

    button.prototype.initEvents = function() {
        this.ele.addEventListener('click', function() {
            console.log("clicked");
        })
    };


  return button;
})();

var saveButton = (function() {

        _extends()
      function saveButton() {

      }
})();

var b = new button();
b.init();
console.log(b);
