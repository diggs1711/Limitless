//1.flatten multiple arrays into one array
function flattenArray(arr , seperator) {
	arr = arr.join(seperator);
	return arr;
}

//2.check if string is palindrome
function checkIfPalindrome(str) {
	str = str.split("");
	var reversedString = str.reverse();

	if(flattenArray(reversedString, "") === str){
		console.log("Yes it's a palindrome!");
	} else {
		console.log("It is not a palindrome.");
	}
}

//3.Add word to string if word not in string
function addWordIfNotPresent(string, word) {
	string = string.split(' ');

	if(!(isWordPresent(string, word).length === 0)) {
		return flattenArray(string, " ");
	} else {
		string.push(word);
		var flat = flattenArray(string, " ");
		return flat
	}
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

(function(){
	//Question 1
	var arr = [1,2,3, [2,54,98, [43,9]],2,3];
	flat = flattenArray(arr, ",");
	console.log(flat);

	//Question2
	var palindrome = "hannah";
	var not = "honey";

	checkIfPalindrome(palindrome);
	checkIfPalindrome(not);

	//Question3
	var result = addWordIfNotPresent("hello foo bar", "bar")
	console.log(result)

	//Question4
	var str = 'foo bar bar foobar foo    hello    bar    foo   ';
	var result = removeWordFromString(str, "bar");
	console.log(result);

	sortDivs('ll-homework');

})();
