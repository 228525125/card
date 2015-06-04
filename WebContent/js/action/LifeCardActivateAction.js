//判断life是否能行动
LifeCardActivateAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		if(this.info.activate)
			this.view.css("background-color","yellow");
	}
});