
ControlQueueRefurbishAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(ControlQueueRefurbishAction.prototype, new Action, {
	doAction : function(){
		var h = this.view.html();		
		var res = '<p style="margin: 0;padding: 0;">刷新队列</p>';
		
		res += '<p style="margin: 0;padding: 0;">';
		for(var i=0;i<this.info.queue.length;i++){
			res += ''+this.info.queue[i].position+' - '+this.info.queue[i].unit.name;
			if(i<(this.info.queue.length-1))
				res += ' | ';
		}
		res += '</p><p style="margin: 0;padding: 0;">------------------------------------------------------------------------</p>';
		
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});