LifeCardCallAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardCallAction.prototype, new Action, {
	doAction : function(){	
		post('select ground place'+this.info.position+' card');
	}
});