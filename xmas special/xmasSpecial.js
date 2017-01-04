var data = [
    { "Id": "1", "Name": "abc", "parent": "" },
    { "Id": "2", "Name": "abc", "parent": "1" },
    { "Id": "3", "Name": "abc", "parent": "2" },
    { "Id": "4", "Name": "abc", "parent": "2" }
];
var tree = document.getElementsByClassName('tree');

tree[0].innerHTML = JSON.stringify(data, undefined, 2);

var map = {},
    mappedElem,
    node,
    roots = [];

for (var i = 0; i < data.length; i++) {
    node = data[i];
    map[node.Id] = node;
    map[node.Id].children = [];

}

for (var id in map) {
    if (map.hasOwnProperty(id)) {
        mappedElem = map[id];

        if (mappedElem.parent !== "") {
            map[mappedElem['parent']]['children'].push(mappedElem);
        } else {
            roots.push(mappedElem);
        }
    }
}

setTimeout(function() {
    tree[0].innerHTML = JSON.stringify(roots, undefined, 2);
    console.dir(roots);
}, 3000)
