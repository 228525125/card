UseCardAddAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(UseCardAddAction.prototype, new Action,{
	doAction : function(){
		this.view.html(this.info.card.name);
	}
});