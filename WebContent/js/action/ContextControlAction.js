
ContextControlAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Context.setControl(this.info.control);
		var notice = Context.getNotice();
		var place = notice.getPlace(3);
		var h = '当前操作者：'+this.info.control.name+'('+this.info.control.resource+')';
		
		if(Context.getOwn().id==this.info.control.id)
			Context.stopSyn();
		else
			Context.beginSyn();
		
		if(undefined!=this.info.life){
			h += '-'+this.info.life.name;
		}
		
		if('send'==this.info.sign && undefined!=this.info.life){
			post('select ground place'+this.info.position+' card');
		}
		
		place.view.html(h);
	}
});