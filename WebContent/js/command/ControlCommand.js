/*
 * 用于处理控制者的状态变化
 */
ControlCommand = function(action,info){
	this.container = Context.getNotice();
	this.position = 3;
	this.info = info;
	this.action = action;
}

ControlCommand.prototype = {
	execute: function(){
		this.container.act(this.position, this.action, this.info);
	}
}