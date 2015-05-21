/**
 * 大部分情况都使用这个Command
 */
GeneralCommand = jClass(Command, {
	
	init: function(action,info){
		
		this.player = info.player;
		var playerData = Context.getPlayer(this.player.id);
		var container = playerData.getContainer(info.container.name);
		var position = info.position;
		var action = action;
		var info = info;
		
		this.superFunction(container,position,action,info);
	}
});