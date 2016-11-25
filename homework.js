var arr = []
var count = 0;
arrayLength = 365;

arr = createArray(arrayLength);
var randomElement = arr[getRandom()];
findElement(randomElement);

function findElement(a) {
    while (randomElement !== getRandom()) {
        count++;
    }
}

function getRandom() {
    return Math.floor((Math.random() * arrayLength)) + 1;
}

function createArray(len) {
    var arr = []
    for (var i = 0; i < len; i++) {
        arr.push(i + 1);
    }
    return arr;
}

console.log("It took " + count + " random calls to find the element " + randomElement);
