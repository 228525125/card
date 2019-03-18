
var Utility = require('../util/Utility');
var List = require('../util/List');

if(!game) var game = {};
if(!game.core) game.core = {};

/**
 * 被观察者
 */
game.core.Observable = Object.extend({
	
	init: function(){
		this.observablelist = new List();
	},
	
	addObserver: function(o){
		this.observablelist.push(o);
	},
	
	notifyObservers: function(info){
		for(var i=0;i<this.observablelist.length;i++){
			this.observablelist[i].update(info);
		}
	},

	print: function() {
		console.log("Observable");
	}
});

var Observable = game.core.Observable;

module.exports = Observable