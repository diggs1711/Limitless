(function(){
	"use strict";

	var arr,
	palindrome,
	notPalindrome,
	randomStr;
	//1.flatten multiple arrays into one array
	function start(){
		init();

		//Question 1
		flattenArray(arr, ",");

		//Question2
		checkIfPalindrome(palindrome);
		checkIfPalindrome(notPalindrome);

		//Question3
		console.log("added bar to string: " + addWordIfNotPresent("hello foo bar", "bar"))

		//Question4
		console.log("removed bar from string: " + removeWordFromString(randomStr, "bar"));

		sortDivs('ll-homework');
	}

	function init() {
		arr = [1,2,3, [2,54,98, [43,9]],2,3];

		palindrome = "Racecar";
		notPalindrome = "honey";

		randomStr = 'foo bar bar foobar foo    hello    bar    foo   ';
	}

	function flattenArray(arr , seperator) {
		arr = arr.join(seperator);
		return arr;
	}

	//2.check if string is palindrome
	function checkIfPalindrome(str) {
		var splitStr = str.toLowerCase().split("");
		var reversedString = splitStr.reverse();

		if(flattenArray(reversedString, "") === str.toLowerCase()){
			console.log(str + " a palindrome!");
		} else {
			console.log(str + " is not a palindrome.");
		}
	}

	//3.Add word to string if word not in string
	function addWordIfNotPresent(string, word) {
		string = string.split(' ');

		if(!checkIfMatchFound(string, word)) {
			return flattenArray(string, " ");
		} else {
			string.push(word);
			var flat = flattenArray(string, " ");
			return flat
		}
	}

	function checkIfMatchFound(string,word) {
		return isWordPresent(string, word).length === 0;
	}
	function isWordPresent(string, word) {
		var filter = string.filter(function(w) {
			return w === word;
		});
		return filter;
	}

	//4. Remove a all instances of a word from a string
	function removeWordFromString(string, word) {
		var r = new RegExp('\\b' + word + '\\b', 'g');
		string = string.replace(r, "").trim().replace(/\s+/g, ' ');
		return string;
	}

	//5.Sort divs by content

	function sortDivs(name) {
		var htmlCollection = document.getElementsByClassName(name);
		var arr = [].slice.call(htmlCollection);

		setTimeout(function() {
			arr.sort(function(v1,v2) {
				return parseInt(v1.innerHTML) > parseInt(v2.innerHTML);
			}).forEach(function(val, index) {
				document.body.appendChild(val);
			});
		}, 3000);

	}

	start();
})();
