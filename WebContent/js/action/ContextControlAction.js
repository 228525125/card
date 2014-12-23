
ContextControlAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(ContextControlAction.prototype, new Action, {
	doAction : function(){
		Context.setControl(this.info.control);
		var notice = Context.getNotice();
		var place = notice.getPlace(3);
		var h = '当前操作者：'+this.info.control.name+'('+this.info.control.power+')';
		
		if(Context.getOwn().id==this.info.control.id)
			Context.stopSyn();
		else
			Context.beginSyn();
		
		if('send'==this.info.sign && undefined!=this.info.life){
			post('select ground place'+this.info.life.containerPosition+' card');
			h += '-'+this.info.life.name;
		}
		
		place.view.html(h);
	}
});