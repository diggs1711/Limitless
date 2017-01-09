(function(){
	'use strict';

	var list;
	var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_'";
	var possibleList = [];
	var listToDisplay = [];
	var inputCount = 0;

	var inputCopyControl = {
		ele: null,
		displayEle: null,
		possibleList: [],
		init: function() {
			this.initEle();
			this.initEvent();
		},
		initEle: function() {
			this.displayEle = document.querySelector('.list-display');
			this.ele = document.querySelector('.input-text');
		},
		initEvent: function() {
			var me = this, value;
			me.ele.addEventListener('keyup', me.updateDisplayEle.bind(me, me.ele));
			me.ele.onpaste = me.updateDisplayEle.bind(me, me.ele);
		},
		updateDisplayEle: function(input, event) {
			var value = input.value;
			this.displayEle.innerText = value;
			inputCopyControl.findMatches(value);
			
		},
		createList: function() {
			for(var i=0;i < 200;i++){
				this.possibleList.push(generateRandomString(20,25))
			}
		},
		displayList: function(lst) {
			this.displayEle.innerText = "";
			lst.map(function(el){
				var e = document.createElement('div');
				var node = document.createTextNode(el);
				e.appendChild(node);
				this.displayEle.appendChild(e);
			}.bind(this));
		},
		findMatches: function(value){
			var matches = this.possibleList.filter(function(str){
				return str.contains(value);
			});
			this.displayList(matches);
		}
	};

	String.prototype.contains = function(val) {
		var index = this.toLowerCase().indexOf(val.toLowerCase());
		var s = this.split("");
		inputCount++;

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
		return possibleCharacters.charAt(getRandomNumber(0, possibleCharacters.length));
	}


	inputCopyControl.init();
	inputCopyControl.createList();
	inputCopyControl.displayList(inputCopyControl.possibleList);
	
})();