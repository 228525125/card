LifeCardDeathAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){	
		/*var div = $('<div style="font-size:9px;">死亡</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(5000,function(){
			div.remove();
		});*/
		
		if('send'==this.info.sign){
			delayPost('reload;');
		}
	}
});