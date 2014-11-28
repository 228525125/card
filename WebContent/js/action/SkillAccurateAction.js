SkillAccurateAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(SkillAccurateAction.prototype, new Action, {
	doAction : function(){
		var div = $('<div>MISS</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});