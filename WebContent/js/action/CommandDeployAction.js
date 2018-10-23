CommandDeployAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*var optionList = Context.getOptionList();
		
		for(var i=0;i<optionList.length;i++){
			optionList[i].html('');
			optionList[i].attr("title","option"+i);
		}
		
		for(var i=0;i<this.info.optionList.length;i++){
			optionList[i].html(this.info.optionList[i].name);
		}*/
		
		var ground = Context.get(Context.Ground);
		ground.landform = this.info.ground.landform;
		ground.buildingList = this.info.ground.buildingList;
		ground.treasureList = this.info.ground.treasureList;
		ground.corpsList = this.info.ground.corpsList;
		
		Context.refurbishGround();
	}
});