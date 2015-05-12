SkillAction = function(info,view){
	this.info = info;
	this.view = view;
	this.skillMap = new Map();
}

$.extend(SkillAction.prototype, new Action, {
	doAction : function(){
		var action = SkillActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});