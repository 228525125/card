
PlayerResourceAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*var control = Context.getControl();
		if(control.id==this.info.player.id){
			var h = this.view.html();
			var h1 = h.split('(')[0];
			var h2 = h.split(')')[1];
			h = h1 + '('+this.info.player.resource.gold+'/'+this.info.player.resource.wood+'/'+this.info.player.resource.stone+'/'+this.info.player.resource.ore+')' + h2;
			this.view.html(h);
		}*/
	}
});