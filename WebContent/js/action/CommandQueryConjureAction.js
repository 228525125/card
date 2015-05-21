CommandQueryConjureAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		this.view.css("background-color","aqua");
	}
});