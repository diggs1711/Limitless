(function() {
	'use strict';

	var data,
		config,
		hello;

	function start() {
		init();
	}
	
	function init() {
		foo();
	}
	
	function foo() {
		bar();
		if(1 === 1) {
	
		} else {
	
		}
		return;
	}
	
	function bar() {
		var a, b, c, d,
			isFound,
			result = [];
		console.log('do something here');
	}
	
	start();
})();