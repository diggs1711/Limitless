(function() {
    'use strict';

    var inputTextControl = {
        inputText: null,
        init: function() {
            this.initEle();
            this.initEvent();
        },
        initEle: function() {
            this.inputText = document.querySelector('.input-text');
        },
        initEvent: function() {
            var me = this,
                value;
            me.inputText.addEventListener('keyup', me.updateDisplayEle.bind(me, me.inputText));
            me.inputText.onpaste = me.updateDisplayEle.bind(me, me.inputText);
        },
        updateDisplayEle: function(input, event) {
            var value = input.value;
            listDisplayControl.findMatches(value);
            listDisplayControl.displayList(listDisplayControl.matchedList);
        }
    };

    var listDisplayControl = {
        displayEle: null,
        possibleList: [],
        matchedList: [],
        init: function() {
            this.initDisplayElement();
        },
        initDisplayElement: function() {
            this.displayEle = document.querySelector('.list-display');
        },
        createList: function() {
            for (var i = 0; i < 200; i++) {
                this.possibleList.push(stringGeneratorControl.generateRandomString(20, 25))
            }
        },
        displayList: function(lst) {
            this.clearList();
            var me = this;
            lst.map(me.appendElementToDiv.bind(this));
        },
        clearList: function() {
            this.displayEle.innerHTML = "";
            this.matchedList = [];
        },
        appendElementToDiv: function(el) {
            var e = document.createElement('div');
            e.innerHTML = el;
            this.displayEle.appendChild(e);
        },
        findMatches: function(value) {
            var me = this;
            this.possibleList.map(me.addMatchesToList.bind(me, value));
        },
        addMatchesToList: function(input, str) {
            if (str.contains(input)) {
                var text = this.highlightText(str, input);
                this.matchedList.push(text);
            };
        },
        highlightText: function(str, value) {
            var index = this.getIndexOfMatchedLetters(str, value);
            var hightlightedText = this.createHighlightedText(index, value, str);
            return hightlightedText;
        },
        getIndexOfMatchedLetters: function(str, value) {
            return str.toLowerCase().indexOf(value.toLowerCase());
        },
        createHighlightedText: function(index, value, str) {
            var vl = value.length;
            var sl = str.length;

            return str.substring(0, index) + "<span class='highlight'>" + str.substring(index, index + vl) +
                "</span>" + str.substring(index + vl, sl);
        }
    }

    var stringGeneratorControl = {
        possibleCharacters: "",
        init: function() {
            this.initCharacterSet();
        },
        initCharacterSet: function() {
            this.possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_'";
        },
        generateRandomString: function(min, max) {
            var randNum = this.getRandomNumber(min, max);
            var result = [];

            for (var i = 0; i < randNum; i++) {
                result.push(this.getRandomCharacter());
            }
            return result.join('');
        },
        getRandomNumber: function(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },
        getRandomCharacter: function() {
            return this.possibleCharacters.charAt(this.getRandomNumber(0, this.possibleCharacters.length));
        }
    };

    String.prototype.contains = function(val) {
        return this.toLowerCase().indexOf(val.toLowerCase()) > -1;
    };

    var app = {
        run: function() {
            stringGeneratorControl.init();
            listDisplayControl.init();
            inputTextControl.init();

            listDisplayControl.createList();
            listDisplayControl.displayList(listDisplayControl.possibleList);
        }
    };

    app.run();
})();
