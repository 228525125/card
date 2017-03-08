ControlQueueMoveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();		
		var res = '<p style="margin: 0;padding: 0;">unit：'+this.info.unit.name+'->插入前排</p>';
		
		res += '<p style="margin: 0;padding: 0;">';
		for(var i=0;i<this.info.queue.length;i++){
			res += ''+this.info.queue[i].position+' - '+this.info.queue[i].unit.name+'('+this.info.queue[i].count+')';
			if(i<(this.info.queue.length-1))
				res += ' | ';
		}
		res += '</p><p style="margin: 0;padding: 0;">------------------------------------------------------------------------</p>';
		
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
		
		/*var queue = Context.getQueue();
		queue = queue.insertAt(this.info.position,this.info.unit);   //info.info 用于访问非常规字段
		Context.setQueue(queue);*/
		
	}
});