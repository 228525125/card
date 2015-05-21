LifeCardAttackAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*var div = $('<div>攻击</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(2000,function(){
			div.remove();
		});*/
		
		layer.tips('攻击', this.view, {time: 1, guide: 1, more: true});
	}
});