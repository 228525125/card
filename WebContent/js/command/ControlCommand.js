/**
 * 用于处理控制者的状态变化
 */
ControlCommand = jClass(Command, {
	
	init: function(action,info){
		
		var container = Context.getNotice();
		var position = 2;
		
		this.superFunction(container,position,action,info);
	}
});