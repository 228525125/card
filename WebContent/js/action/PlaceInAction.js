PlaceInAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(PlaceInAction.prototype, new Action, {
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.html(this.info.card.name);
		
		var pd = Context.getPlayer(this.info.player.id);
		Buffer.setSelectContainer(pd.getContainer(this.info.container.name));
		Buffer.setSelectPosition(this.info.position);
	}
});