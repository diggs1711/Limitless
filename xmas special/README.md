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
