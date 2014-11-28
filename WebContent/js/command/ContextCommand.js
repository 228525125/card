ContextCommand = function(action,info){
	this.container = Context.getNotice();
	this.position = 1;
	this.info = info;
	this.action = action;
}

ContextCommand.prototype = {
	execute: function(){
		this.container.act(this.position, this.action, this.info);
	}
}