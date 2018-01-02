
ContextControlAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Context.setControl(this.info.control);
		var notice = Context.getNotice();
		var place = notice.getPlace(3);
		
		var h = '控制：'+this.info.control.name+'['+this.info.control.ration+'/'+this.info.control.rationLimit+']';
		
		var id = Context.getOwn().id;
		
		if(id==this.info.control.id)
			Context.stopSyn();
		else
			Context.beginSyn();
		
		place.view.html(h);
	}
});