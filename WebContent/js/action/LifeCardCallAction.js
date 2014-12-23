LifeCardCallAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardCallAction.prototype, new Action, {
	doAction : function(){	
		if('send'==this.info.sign){
			post('select ground place'+this.info.position+' card;');
		}
	}
});