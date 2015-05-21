QueryCommand = jClass(Command, {
	
	init: function(action, info){
		this.player = info.player;
		var playerData = Context.getPlayer(this.player.id);
		var container = playerData.getContainer(info.container.name);
		this.positionList = info.positionList;
		var action = action;
		var info = info;
		
		this.superFunction(container,0,action,info);
	},
	
	execute: function(){
		for(var i=0;i<this.positionList.length;i++){
			var position = this.positionList[i];
			this.container.act(position,this.action,this.info);
		}
	}
});