GroundLoadMapAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">场景创建成功！</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});