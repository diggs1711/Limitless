/*****************************

Create a piece of code that turn a flat structured array like "data" into a tree structured data like "processData".
As you can see in "data" every object contains its parent's id.

***********************************/

var data = [
    {"Id":"1", "Name":"abc", "parent":""},  
    {"Id":"2", "Name":"abc", "parent":"1"},
    {"Id":"3", "Name":"abc", "parent":"2"},
    {"Id":"4", "Name":"abc", "parent":"2"}
];

/*
var processData = {
	root: {
		id: '1',
		name: 'abc',
		parent: '',
		children: [
			{
				id: '2',
				name: 'abc',
				parent: '1',
				children: [
					{
						id: '3',
						name: 'abc',
						parent: '2',
						children: []
					},
					{
						id: '4',
						name: 'abc',
						parent: '2',
						children: []
					}
				]
			}
		]
	}
}
*/

var createTree = function(array, rootNodes, customId) {
	var tree = []

	for(var rootNode in rootNodes) {
		var node = rootNodes[rootNode];
		var childNode = array[node[customId]];

		if(!node && !rootNodes.hasOwnProperty(rootNode)) {
			continue ;
		}

		if(childNode) {
			node.children = createTree(array, childNode, customId)
		}

		tree.push(node);
	}

	return tree;
}

var groupByParents = function(array, options) {
	return array.reduce(function(prev, item) {
		var parentId = item[options.parent] || options.rootID;

		if(parentId && prev.hasOwnProperty(parentId)) {
			prev[parentId].push(item);
			return prev;
		}

		prev[parentId] = [item];
		return prev;
	}, {});
};


var grouped = groupByParents(data, options);
var result = createTree(grouped, grouped[options.rootID], options.customId)

//https://github.com/alferov/array-to-tree/blob/master/index.js