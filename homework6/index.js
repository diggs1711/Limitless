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
		},
		initEle: function() {
			this.displayEle = document.querySelector('.list-display');
			this.ele = document.querySelector('.input-text');

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
		},
		createList: function() {
			for(var i=0;i < 200;i++){
				this.possibleList.push(generateRandomString(20,25))
			}
		},
		displayList: function(lst) {
			this.displayEle.innerHTML = "";
			var me = this;
			lst.map(me.appendElementToDiv.bind(this));
		},
		appendElementToDiv: function(el) {
				var e = document.createElement('div');
				e.innerHTML = el;
				this.displayEle.appendChild(e);
		},
		findMatches: function(value){
			this.matchedList = [];
			this.possibleList.filter(function(str){
				var result = str.contains(value);
				if(result){
					this.highlightText(str, value);
				};

				return result
			}.bind(this));

			this.displayList(this.matchedList);
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