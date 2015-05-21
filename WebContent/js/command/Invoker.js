//命令执行者
Invoker = jClass({
	
	init: function(){
		this.command = null;
	},
	
	action: function(){
		this.command.execute();
	},
	response: function(resp, sign){
		var action = resp.action;
		var data = resp.info;
		data.sign = sign;
		
		this.command = CommandFactory.createCommand(action,data);
		this.action();
	}
});

var Invoker = new Invoker();