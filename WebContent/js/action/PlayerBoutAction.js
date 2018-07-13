
PlayerBoutAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Context.setControl(this.info.player);
		var notice = Context.getNotice();
		var place = notice.getPlace(3);
		
		var h = '控制：'+this.info.player.name+'['+this.info.player.ration+'/'+this.info.player.rationLimit+']';
		
		var id = Context.getOwn().id;
		
		if(id==this.info.player.id)
			Context.stopSyn();
		else
			Context.beginSyn();
		
		place.view.html(h);
	}
});