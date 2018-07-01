
ContextStartAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">GameStart</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
		
		var ground = Context.get(Context.Ground);
		ground.id = this.info.ground.id;
		ground.xBorder = this.info.ground.xBorder;
		ground.yBorder = this.info.ground.yBorder;
		ground.landform = this.info.ground.landform;
		ground.buildingList = this.info.ground.buildingList;
		ground.treasureList = this.info.ground.treasureList;
		ground.corpsList = this.info.ground.corpsList;
		
		Context.refurbishGround();
	}
});