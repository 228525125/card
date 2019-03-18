/**
 * 大部分情况都使用这个Command
 */
GeneralCommand2 = jClass(Command, {
	
	init: function(action,info){
		var container = Context.getNotice();
		var position = 4;
		
		this.superFunction(container,position,action,info);
	}
});