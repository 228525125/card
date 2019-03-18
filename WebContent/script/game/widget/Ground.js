var Container = require('./Container');

if(!game) var game = {};
if(!game.widget) game.widget = {};

/**
 * 战场
 */
game.widget.Ground = Container.extend({
	
	id : 0,
	xBorder : 1,
	yBorder : 1,
	landform : new Map(),
	buildingList : [],
	treasureList : [],
	corpsList : [],
	
	init: function(xBorder, yBorder){
		
		this.superFunction();
		this.xBorder = xBorder;
		this.yBorder = yBorder;
	},

	print: function() {
		console.log("Ground");
	}
});

var Ground = game.widget.Ground;

module.exports = Ground