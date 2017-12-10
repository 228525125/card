
ContextDeployAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">player：'+this.info.control.name+'->开始部署 | '+this.info.day+'日-'+this.info.week+'周-'+this.info.bout+'回合'+';</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});