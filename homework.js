//Assignment 1
//Same birtday problem

var assignmentOne = function() {
    var arr = [];
    var count = 0;
    var max = 365;

    var arr = createArray(max);
    var count = matchPeopleWithSameBirthday();

    var answer = document.getElementById("answer");
    answer.innerHTML = count;

    function matchPeopleWithSameBirthday() {
        var birthdays = [];
        for (var i = 0;; i++) {
            var randomElement = arr[getRandom()];
            if (birthdays.indexOf(randomElement) === -1) {
                birthdays.push(randomElement);
            } else {
                return i;
            }
        }
    }

    function getRandom() {
        return Math.floor((Math.random() * max) + 1);
    }

    function createArray(len) {
        var arr = []
        for (var i = 0; i < len; i++) {
            arr.push(i + 1);
        }
        return arr;
    }
}
