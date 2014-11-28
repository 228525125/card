Player = function(id,containerMap){
	this.id = id;
	this.container = containerMap;
	this.processSequence = 0;
}

Player.prototype = {
	getContainer: function(name){
		return this.container.get(name);
	}
}