










(function() {
	"use strict";

	var possible,
	arraySizeForQuestion2,
	arraySizeForQuestion4,
	originalArrayForQuestion3;

	function start() {
		init();

		//1
		console.log(generateRandomString(15,25));

		//2
		console.log(generateRandomArray(arraySizeForQuestion2, 25, 35));

		//3
		console.log(filterOutElementsWithDigits(originalArrayForQuestion3));

		//4
		generateDomElementsWithRandomStrings(arraySizeForQuestion4, 65, 80);
	}

	function init() {
		possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_'";
		arraySizeForQuestion2 = 200;
		arraySizeForQuestion4 = 300;
		originalArrayForQuestion3 = ['ssfdds', 'adfd33dsf', '2ysdjlj', 'bb'];
	}

	//I. Create a function that will randomly generate a string with a length 
	//between 15 - 25 inclusive. Note that only number, charactor, '.', '-', '_' are allowed.
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

	function randomCharacter () {
		return possible.charAt(Math.floor(Math.random() * possible.length + 1));
	}

	

	//II. Create a function that will return an array of data with
	//    has a size of 200 and each element is a random string which has the size of 25 - 35.
	function generateRandomArray(arraySize, min, max) {
		var arr = [];

		for(var i=0;i<arraySize;i++) {
			arr.push(generateRandomString(min, max));
		}
		return arr;
	}

	//III. Create a function that will filter out any element which contains number.
	function filterOutElementsWithDigits(arr) { 
		var arr = arr.filter(function(el) {
			if (!doesElementContainAnyDigits(el)) {
				return el;
			}
		});
		return arr;
	}

	function doesElementContainAnyDigits(el) {
		return el.match(/\d+/g) === null;
	}


	//IV. Create a function that will take a array with size of 300 as input and return
	// 300 dom elements each of which has the string as its content and then append them
	//into the "body" so that you can see them on your screen. Style your list with css
	// (you need to do the research youself on this part) to look like the design i attached
	//in this session. Note that each string inside has to be a random string which
	//has the size of 65 - 80.
	function generateDomElementsWithRandomStrings(arraySize, min, max) {
		for (var i = 0; i < arraySize; i++) {
			var ele = document.createElement('div');
			ele.innerHTML = generateRandomString(min, max) + "<img src='x-icon.png'/>";
			ele.className = "random-list";
			document.body.appendChild(ele);
		}
	}
	
	start();

})();