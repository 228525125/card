
PlayerBoutAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		if(Context.getControl().id==this.info.player.id){
			var h = this.view.html();
			
		}
	}
});