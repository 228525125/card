/**
 * 专用于处理Context类型的命令
 */
ContextCommand = jClass(Command, {
	
	init: function(action,info){
		
		this.superFunction(Context.getNotice(),1,action,info);
	}
});