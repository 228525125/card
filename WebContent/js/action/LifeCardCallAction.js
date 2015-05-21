LifeCardCallAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){	
		if('send'==this.info.sign){
			post('select ground place'+this.info.position+' card;');
		}
	}
});