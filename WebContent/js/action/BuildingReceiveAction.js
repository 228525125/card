BuildingReceiveAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var ground = Context.get(Context.Ground);
		if(this.info.mapId!=ground.id){
			post('switch '+this.info.mapId);
		}else{
			post('reload');
		}
	}
});