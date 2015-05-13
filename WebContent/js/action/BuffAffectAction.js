BuffAffectAction = function(info,view){
	this.info = info;
	this.view = view;
	this.skillMap = new Map();
}

$.extend(BuffAffectAction.prototype, new Action, {
	doAction : function(){
		var action = BuffAffectActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});