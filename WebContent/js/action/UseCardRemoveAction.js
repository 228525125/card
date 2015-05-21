UseCardRemoveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.html("");
		var player = Context.getPlayer(this.info.player.id);
		var useCard = player.getContainer('UseCard');
		for(var i=this.info.position;i<=7;i++){
			var uc1 = useCard.getPlace(i);
			if((i+1)<=7){
				var uc2 = useCard.getPlace(i+1);
				uc1.view.html(uc2.view.html());
			}
		}		
		
		var pd = Context.getPlayer(this.info.player.id);
		Buffer.setSelectContainer(pd.getContainer(this.info.container.name));
		Buffer.setSelectPosition(this.info.position);
	}
});