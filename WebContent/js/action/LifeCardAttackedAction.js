LifeCardAttackedAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		var div = $('<div>-'+this.info.damage+'</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(2000,function(){
			div.remove();
		});
	}
});