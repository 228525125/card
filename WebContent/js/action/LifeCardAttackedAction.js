LifeCardAttackedAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardAttackedAction.prototype, new Action, {
	doAction : function(){
		var div = $('<div>-'+this.info.damage+'</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(2000,function(){
			div.remove();
		});
	}
});