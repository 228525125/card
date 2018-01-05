PlaceOutAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		this.view.html('');
		
		Buffer.setSelectContainer(Context.get(Context.Ground));
		Buffer.setSelectPosition(this.info.position);
	}
});