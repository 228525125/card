BuffInvalidAction = function(info,view){
	this.info = info;
	this.view = view;
	this.skillMap = new Map();
}

$.extend(BuffInvalidAction.prototype, new Action, {
	doAction : function(){
		var action = BuffInvalidActionFactory.createAction(this.info,this.view)
		if(null!=action)
			action.doAction();
	}
});