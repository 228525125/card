LifeCardMoveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*var player = Context.getPlayer(this.info.player.id);
		var container =  player.getContainer(info.container.name);
		var place = container.getPlace(info.begin);
		place.view.html('');
		this.view.html(this.info.card.name);*/
		
		if('send'==this.info.sign){
			post('select ground place'+this.info.position+' card;');
		}
	}
});