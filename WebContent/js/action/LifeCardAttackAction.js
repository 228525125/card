LifeCardAttackAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardAttackAction.prototype, new Action, {
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