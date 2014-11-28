
PlayerPowerAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(PlayerPowerAction.prototype, new Action, {
	doAction : function(){
		if(Context.getControl().id==this.info.player.id){
			var h = this.view.html();
			var h1 = h.split('(')[0];
			var h2 = h.split(')')[1];
			h = h1 + '('+this.info.power+')' +h2;
			this.view.html(h);
		}
	}
});