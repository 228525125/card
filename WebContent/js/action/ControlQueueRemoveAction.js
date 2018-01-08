
ControlQueueRemoveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();		
		var res = '<p style="margin: 0;padding: 0;">player：'+this.info.player.name+'->从队列移除</p>';
		
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
		
		/*var queue = Context.getQueue();
		queue = queue.removeAt(this.info.position);   //info.info 用于访问非常规字段
		Context.setQueue(queue);*/
	}
});