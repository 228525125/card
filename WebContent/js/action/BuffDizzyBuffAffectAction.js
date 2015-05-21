BuffDizzyBuffAffectAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		var div = $('<div>击晕</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});
	
	

$.extend(BuffDizzyBuffAffectAction.prototype, new Action, {
	
});