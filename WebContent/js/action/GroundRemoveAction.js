GroundRemoveAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(GroundRemoveAction.prototype, new Action,{
	doAction : function(){
		this.view.html('');
	}
});