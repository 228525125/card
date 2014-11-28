LifeCardDeathAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardDeathAction.prototype, new Action, {
	doAction : function(){	
		var div = $('<div style="font-size:9px;">死亡</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(5000,function(){
			div.remove();
		});
	}
});