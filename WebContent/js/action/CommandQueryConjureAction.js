CommandQueryConjureAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(CommandQueryConjureAction.prototype, new Action,{
	doAction : function(){
		this.view.css("background-color","aqua");
	}
});