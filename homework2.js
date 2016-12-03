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


(function(){
	var arr = [1,2,3, [2,54,98, [43,9]],2,3];
	falt = flattenArray(arr, ",");
	console.log(flat);

	var palindrome = "hannah";
	var not = "honey";

	checkIfPalindrome(palindrome);
	checkIfPalindrome(not);

})();
