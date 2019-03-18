var Observable = require('../core/Observable');

if(!game) var game = {};
if(!game.widget) game.widget = {};

/**
 * 容器，对应后台的Container
 */
game.widget.Container = Observable.extend({
	
	init: function(){
		
		this.superFunction();
	},
	
	act: function(position, action, info){	
		this.notifyObservers({position: position, action: action, info: info});
	},
	
	getPlace: function(position){
		return this.observablelist.get(position);
	}
});

var Container = game.widget.Container;

module.exports = Container