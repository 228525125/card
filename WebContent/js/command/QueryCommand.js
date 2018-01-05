QueryCommand = jClass(Command, {
	
	init: function(action, info){
		var container = Context.get(Context.Ground);
		this.positionList = info.positionList;
		
		this.superFunction(container,0,action,info);
	},
	
	execute: function(){
		for(var i=0;i<this.positionList.length;i++){
			var position = this.positionList[i];
			this.container.act(position,this.action,this.info);
		}
	}
});