function Animal(config) {

  config = config || {};

    var o = {

        ele: null,
        isMammal: false,
        move: function() {
            console.log(this.name + ' is moving.');
        },

        init: function() {

        },


    }

    o.init();
    return o;
};


var ani = Animal();

function _extends(chi, par) {
    for (var i in par) {
        chi[i] = par[i];
    }
    return chi;
}


function horse() {
    var o = {};
    _extends(o, Animal());
    o.name = 'horse';
    o.isMammal = true;

    return o;
}

var h = horse();
h.move();

function RacingHorse() {
    var o = {};
    _extends(o, horse());

    o.luxuryIndex = 100;

    return o;
}

var rh = RacingHorse();
