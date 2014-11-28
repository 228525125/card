//命令执行者
Invoker = function(){
	this.command = null;
}

Invoker.prototype = {
	action: function(){
		this.command.execute();
	},
	response: function(resp){
		var action = resp.action;
		var data = resp.info;
		
		this.command = CommandFactory.createCommand(action,data);
		this.action();
	}
}

var Invoker = new Invoker();