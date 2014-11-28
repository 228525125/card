ShowCommand = function(action,info){
	this.container = Context.getNotice();
	this.position = 2;
	this.info = info;
	this.action = action;
}

ShowCommand.prototype = {
	execute: function(){
		this.container.act(this.position, this.action, this.info);
	}
}