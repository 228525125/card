GroundLoadMapAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">加载场景！</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
		
		Context.refurbishGround();
		
		Context.put(Context.Landform,this.info.landform);
		Context.reloadLandform();
		
		Context.put(Context.BuildingList,this.info.buildingList);
		Context.reloadBuilding();
		
		Context.put(Context.TreasureList,this.info.treasureList);
		Context.reloadTreasure();
		
		Context.put(Context.CorpsList,this.info.corpsList);
		Context.reloadCorps();
	}
});