GroundAddAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		this.view.html(this.info.card.name);
	}
});