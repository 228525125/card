LifeCardMoveAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardMoveAction.prototype, new Action, {
	doAction : function(){
		/*var player = Context.getPlayer(this.info.player.id);
		var container =  player.getContainer(info.container.name);
		var place = container.getPlace(info.begin);
		place.view.html('');
		this.view.html(this.info.card.name);*/
	
		post('select ground place'+this.info.position+' card');
	}
});