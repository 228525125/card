LifeCardMoveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*var player = Context.getPlayer(this.info.player.id);
		var container =  player.getContainer(info.container.name);
		var place = container.getPlace(info.begin);
		place.view.html('');
		this.view.html(this.info.card.name);
		
		if('send'==this.info.sign){
			post('select ground place'+this.info.position+' corps;');
		}*/
		
		/*Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		var ground =  Context.get(Context.Ground);
		var place = ground.getPlace(this.info.start);
		place.view.html('');
		
		this.view.html(this.info.card.name);
		
		
		Buffer.setSelectContainer(ground);
		Buffer.setSelectPosition(this.info.position);*/
		
		if('send'==this.info.sign){
			delayPost('reload;');
		}
	}
});