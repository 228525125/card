BuffEffectAction = function(info,view){
	this.info = info;
	this.view = view;
	this.skillMap = new Map();
}

$.extend(BuffEffectAction.prototype, new Action, {
	doAction : function(){
		var action = BuffEffectActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});