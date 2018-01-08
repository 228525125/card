
ControlQueueRefurbishAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();		
		var res = '<p style="margin: 0;padding: 0;">刷新队列</p>';
		
		res += '<p style="margin: 0;padding: 0;">';
		for(var i=0;i<this.info.queue.length;i++){
			res += ''+this.info.queue[i].position+' - '+this.info.queue[i].player.name+'('+this.info.queue[i].count+')';
			if(i<(this.info.queue.length-1))
				res += ' | ';
		}
		res += '</p><p style="margin: 0;padding: 0;">------------------------------------------------------------------------</p>';
		
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});