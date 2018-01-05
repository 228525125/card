ShowCommand = jClass(Command, {
	
	init: function(action,info){
		var container = Context.getNotice();
		var position = 2;
		
		this.superFunction(container,position,action,info);
	}
});