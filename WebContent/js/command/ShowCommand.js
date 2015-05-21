ShowCommand = jClass(Command, {
	
	init: function(action,info){
		var container = Context.getNotice();
		var position = 2;
		var info = info;
		var action = action;
		
		this.superFunction(container,position,action,info);
	}
});