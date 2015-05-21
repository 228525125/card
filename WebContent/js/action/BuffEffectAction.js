BuffEffectAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
		this.skillMap = new Map();
	},
	
	doAction : function(){
		var action = BuffEffectActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});