
Command = function(action,info){
	this.player = info.player;
	var playerData = Context.getPlayer(this.player.id);
	this.container = playerData.getContainer(info.container.name);
	this.position = info.position;
	this.action = action;
	this.info = info;
}

Command.prototype = {
	execute: function(){
		this.container.act(this.position, this.action, this.info);
	}
}