CommandReadyAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var ground = Context.get(Context.Ground);
		ground.landform = this.info.ground.landform;
		ground.buildingList = this.info.ground.buildingList;
		ground.treasureList = this.info.ground.treasureList;
		ground.corpsList = this.info.ground.corpsList;
		
		Context.refurbishGround();
	}
});