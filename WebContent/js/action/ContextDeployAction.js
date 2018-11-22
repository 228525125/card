
ContextDeployAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">player：'+this.info.player.name+'->开始部署 | '+this.info.bout+'回合'+';</p>');
		
		var notice = Context.getNotice();
		var place = notice.getPlace(3);
		
		h = '控制：'+this.info.player.name+'['+(null!=this.info.corps ? this.info.corps.name+this.info.corps.playId : '')+']';
		place.view.html(h);
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});