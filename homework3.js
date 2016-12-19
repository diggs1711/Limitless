//1. randomly generate a string with a length between 15-25
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-_'";

function generateRandomString() {
	var randNum = getRandomNumber();
	var result = [];
	

	for(var i=0;i<randNum;i++) {
		result.push(possible.charAt(randomCharacter()))
	}

	return result.join('');
}

function getRandomNumber() {
	return Math.floor((Math.random() * 25) + 15);
}

function randomCharacter () {
	return Math.floor(Math.random() * possible.length);
}

console.log(generateRandomString());