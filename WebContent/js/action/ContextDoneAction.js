
ContextDoneAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">'+this.info.control.name+'操作结束！</p>');
		if(null!=this.info.life)
			this.view.html(h+'<p style="margin: 0;padding: 0;">'+this.info.life.name+'操作结束！</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});