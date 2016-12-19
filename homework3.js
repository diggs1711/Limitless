//II. Create a function that will return an array of data with
//    has a size of 200 and each element is a random string which has the size of 25 - 35.

var arraySize = 200;

//III. Create a function that will filter out any element which contains number.

var original = ['ssfdds', 'adfd33dsf', '2ysdjlj', 'bb'];

var result = original.filter(function(el) {
  if(el.match(/\d+/g) != null) {
    return el;
  }
});

console.log(result);

//IV. Create a function that will take a array with size of 300 as input and return
// 300 dom elements each of which has the string as its content and then append them
//into the "body" so that you can see them on your screen. Style your list with css
// (you need to do the research youself on this part) to look like the design i attached
//in this session. Note that each string inside has to be a random string which
//has the size of 65 - 80.

var arraySize = 300;

for(var i=0;i<arraySize;i++) {
  var ele = document.createElement('div');
  ele.innerHTML = getRandomString();
  ele.className = "random-list";
  document.body.appendChild(ele);
}

function updateMonth () {
  
}
function getRandomString() {
  return "string";
}
