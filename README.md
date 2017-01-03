# Limitless
work completed at limitless  
Javascript, HTML, CSS


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

# Homework for Session 4   
With what you learned up to now  
build a datepicker looks like the following design and see how far you can go.  
try to seperate the data and view as much as you could  
samll functions  
if you cannot style it properly don't worry about it. just make sure the functionality is correct  
you have learned how to attach event such as "click" yet, so, i don't expect you to be able to implement the swithcing-month.  
what i do expect from you is to have a function that takes the "year" and the "month" as input and when you render the page it will then show the datepicker for that year&month.  
functions you might need:  

```JavaScript
var datePicker = document.createElement('div');  
var month = document.createElement('div'); // or table  
var week = document.createElement('div'); // or tr  
var date = document.createElement('div'); // or td  
  
week.appendChild(date);  
month.appendChild(week);  
datePicker.appendChild(month);  
document.body.appendChild(datePicker);  

```
#Xmas Special Homework
Create a piece of code that turn a flat structured array like "data" into a tree structured data like "processData".  
As you can see in "data" every object contains its parent's id.  
See who can do it in a very efficient way.!  
good luck!!!  
```JavaScript
var data = [  
    {"Id":"1", "Name":"abc", "parent":""},    
    {"Id":"2", "Name":"abc", "parent":"1"},  
    {"Id":"3", "Name":"abc", "parent":"2"},  
    {"Id":"4", "Name":"abc", "parent":"2"}  
];  
  
var processData = [{
    "root": [{
        "Id": "1",
        "Name": "abc",
        "parent": "",
        "children": [{
            "Id": "2",
            "Name": "abc",
            "parent": "1",
            "children": [{
                "Id": "3",
                "Name": "abc",
                "parent": "2",
                "children": []
            }, {
                "Id": "4",
                "Name": "abc",
                "parent": "2",
                "children": []
            }]
        }]
    }]
}]
```  
