SkillAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var action = SkillActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});