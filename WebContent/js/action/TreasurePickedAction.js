TreasurePickedAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*
		 * 将物品拿掉
		 
		var html = this.view.html();
		this.view.html(html.replace("【物品】",''));*/
		
		/*
		 * 更新Context.TreasureMap
		
		var map = Context.get(Context.TreasureMap);
		delete map[this.info.position.toString()]; */
		
		post('reload');
	}
});