# Homework for Session 3
I. Create a function that will randomly generate a string with a length between 15 - 25 inclusive. Note that only number, charactor, '.', '-', '_' are allowed.
//example: 'kjer_a.d12_-erET'
II. Create a function that will return an array of data with has a size of 200 and each element is a random string which has the size of 25 - 35.  
//example: ['afasdf424234', 'adsfdf-.RE4432B'. .......]  
III. Create a function that will filter out any element which contains number.  
// orginal ['ssfdds', 'adfd33dsf', '2ysdjlj', 'bb'];  
// result ['ssfdds', 'bb'];  
IV. Create a function that will take a array with size of 300 as input and return 300 dom elements each of which has the string as its content and then append them into the "body" so that you can see them on your screen. Style your list with css (you need to do the research youself on this part) to look like the design i attached in this session. Note that each string inside has to be a random string which has the size of 65 - 80.  
// to create a dom element  

```JavaScript 
var ele = document.createElement('div');  
  
// to add content to an element  
var str = 'Limitless Rocks';  
ele.innerHTML = str; OR ele.innerText = str;  
  
// to append one element to body  
document.body.appendChild(ele);  
```
```HTML
// result:  
<div>blah blah</div>  
<div>blah blah</div>  
<div>blah blah</div>  
<div>blah blah</div>  
...  
...  
<div>blah blah</div>  
```
