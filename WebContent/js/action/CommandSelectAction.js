CommandSelectAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.css("color","red");
		
		Buffer.setSelectContainer(Context.get(Context.Ground));
		Buffer.setSelectPosition(this.info.position);
	}
});