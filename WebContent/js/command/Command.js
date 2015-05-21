/**
 * 命令
 */
Command = jClass({
	
	init: function(container,position,action,info){
		this.container = container;
		this.position = position;
		this.action = action;
		this.info = info;
	},
	
	execute: function(){
		this.container.act(this.position, this.action, this.info);
	}
});
