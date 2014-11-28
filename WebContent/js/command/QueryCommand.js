QueryCommand = function(action, info){
	this.player = info.player;
	var playerData = Context.getPlayer(this.player.id);
	this.container = playerData.getContainer(info.container.name);
	this.positionList = info.positionList;
	this.action = action;
	this.info = info;
}

QueryCommand.prototype = {
	execute: function(){
		for(var i=0;i<this.positionList.length;i++){
			var position = this.positionList[i];
			this.container.act(position,this.action,this.info);
		}
	}
}