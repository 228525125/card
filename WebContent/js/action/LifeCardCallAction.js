LifeCardCallAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.html(this.info.card.name);
		
		Buffer.setSelectContainer(Context.get(Context.Ground));
		Buffer.setSelectPosition(this.info.position);
		
		if('send'==this.info.sign){
			post('select ground place'+this.info.position+' card;');
		}
	}
});