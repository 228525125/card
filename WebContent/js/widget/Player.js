/**
 * 比赛者
 */
Player = jClass({
	
	init: function(id,containerMap){
		this.id = id;
		this.container = containerMap;
		this.processSequence = 0;
	},
	
	getContainer: function(name){
		return this.container.get(name);
	}
});