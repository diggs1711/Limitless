(function(){
	'use strict';

	var inputCopyControl = {
		ele: null,
		displayEle: null,
		possibleList: [],
		listToDisplay: [],
		possibleCharacters: "",
		matchedList: [],

		init: function() {
			this.initEle();
			this.initEvent();
			this.initCharacterSet();
		},
		initEle: function() {
			this.displayEle = document.querySelector('.list-display');
			this.ele = document.querySelector('.input-text');	
		},
		initCharacterSet: function() {
			this.possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_'";
		},
		initEvent: function() {
			var me = this, value;
			me.ele.addEventListener('keyup', me.updateDisplayEle.bind(me, me.ele));
			me.ele.onpaste = me.updateDisplayEle.bind(me, me.ele);
		},
		updateDisplayEle: function(input, event) {
			var value = input.value;
			inputCopyControl.findMatches(value);
			this.displayList(this.matchedList);	
		},
		createList: function() {
			for(var i=0;i < 200;i++){
				this.possibleList.push(generateRandomString(20,25))
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
	};

	String.prototype.contains = function(val) {
		return this.toLowerCase().indexOf(val.toLowerCase()) > -1;
	}

	function generateRandomString(min, max) {
		var randNum = getRandomNumber(min, max);
		var result = [];

		for(var i=0;i<randNum;i++) {
			result.push(randomCharacter());
		}
		return result.join('');
	}

	function getRandomNumber(min,max) {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}

	function randomCharacter() {
		return inputCopyControl.possibleCharacters.charAt(getRandomNumber(0, inputCopyControl.possibleCharacters.length));
	}

	inputCopyControl.init();
	inputCopyControl.createList();
	inputCopyControl.displayList(inputCopyControl.possibleList);
	
})();