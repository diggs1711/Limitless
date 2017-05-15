(function() {

    var pubSub = require("./pubSub.js");

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
