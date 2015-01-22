SkillParryAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(SkillParryAction.prototype, new Action, {
	doAction : function(){
		var div = $('<div>'+this.info.skill.name+'</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});