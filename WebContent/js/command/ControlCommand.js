/**
 * 用于处理控制者的状态变化
 */
ControlCommand = jClass(Command, {
	
	init: function(action,info){
		
		this.superFunction(Context.getNotice(),3,action,info);
	}
});