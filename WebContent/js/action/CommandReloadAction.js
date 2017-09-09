CommandReloadAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var playerData = Context.getPlayer(this.info[0].player.id);
		var use = playerData.getContainer('UseCard');
		var ground = playerData.getContainer('Ground');
		
		//var otherData = Context.getPlayer(this.info[1].other.id);
		//var otheruse = otherData.getContainer('UseCard');
		
		for(var i=0;i<this.info[0].use.length;i++){
			var card = this.info[0].use[i];
			var position = card.containerPosition;
			var place = use.getPlace(position);
			if('true'==card.available)
				place.view.css("color","yellow");
			place.view.html(card.name);
		}
		
		for(var i=0;i<this.info[0].god.length;i++){
			if(null!=this.info[0].god[i].life){
				var card = this.info[0].god[i].life;
				if(0>=card.life)
					continue;
				var position = card.containerPosition;
				var place = ground.getPlace(position);
				place.view.html(card.name);
			}
		}
		
		/*for(var i=0;i<this.info[1].otheruse.length;i++){
			var card = this.info[1].otheruse[i];
			var position = card.containerPosition;
			var place = otheruse.getPlace(position);
			place.view.html(card.name);
		}*/
	}
});