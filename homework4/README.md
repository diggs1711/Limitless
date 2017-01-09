
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
