/**
 * 大部分情况都使用这个Command
 */
GeneralCommand = jClass(Command, {
	
	init: function(action,info){
		var container = Context.get(Context.Ground);
		var position = info.position;
		
		this.superFunction(container,position,action,info);
	}
});