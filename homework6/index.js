(function(){
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
			var me = this, value;
			me.inputText.addEventListener('keyup', me.updateDisplayEle.bind(me, me.inputText));
			me.inputText.onpaste = me.updateDisplayEle.bind(me, me.inputText);
		},
		updateDisplayEle: function(input, event) {
			var value = input.value;
			listDisplayControl.findMatches(value);
			listDisplayControl.displayList(listDisplayControl.matchedList);
		}
	};

	String.prototype.contains = function(val) {
		return this.toLowerCase().indexOf(val.toLowerCase()) > -1;
	};

	var listDisplayControl = {
		displayEle: null,
		possibleList: [],
		matchedList: [],
		init: function(){
			this.initDisplayElement();
		},
		initDisplayElement: function() {
			this.displayEle = document.querySelector('.list-display');
		},
		createList: function() {
			for(var i=0;i < 200;i++){
				this.possibleList.push(stringGeneratorControl.generateRandomString(20,25))
			}
		},
		displayList: function(lst) {
			this.clearList();
			var me = this;
			lst.map(me.appendElementToDiv.bind(this));
		},
		clearList: function() {
			this.displayEle.innerHTML = "";
		},
		appendElementToDiv: function(el) {
				var e = document.createElement('div');
				e.innerHTML = el;
				this.displayEle.appendChild(e);
		},
		findMatches: function(value){
			var me =this;
			this.matchedList = [];
			this.possibleList.filter(me.doesStringContainInputValue.bind(me, value));
		},
		doesStringContainInputValue: function(input, str){
			var result = str.contains(input);
				if(result){
					this.highlightText(str, input);
				};
				return result;
		},
		highlightText: function(str, value) {
			var index = str.toLowerCase().indexOf(value.toLowerCase());
			var hightlightedText = str.substring(0,index) + "<span class='highlight'>" + str.substring(index, index+value.length)
				+"</span>" + str.substring(index+value.length, str.length);
			this.matchedList.push(hightlightedText);
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

			for(var i=0;i<randNum;i++) {
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
