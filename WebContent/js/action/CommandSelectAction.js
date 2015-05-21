CommandSelectAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.css("color","green");
		
		var pd = Context.getPlayer(this.info.player.id);
		Buffer.setSelectContainer(pd.getContainer(this.info.container.name));
		Buffer.setSelectPosition(this.info.position);
	}
});