SkillThumpAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(SkillThumpAction.prototype, new Action, {
	doAction : function(){
		var div = $('<div>重击</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});