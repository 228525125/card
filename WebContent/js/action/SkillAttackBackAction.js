SkillAttackBackAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(SkillAttackBackAction.prototype, new Action, {
	doAction : function(){
		var div = $('<div>反击</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});