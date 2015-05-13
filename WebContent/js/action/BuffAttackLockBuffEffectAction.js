BuffAttackLockBuffEffectAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(BuffAttackLockBuffEffectAction.prototype, new Action, {
	doAction : function(){
		Buffer.cancelSelect();
		Buffer.cancelQuery();
		
		var div = $('<div>锁定</div>');
		div.css("color","red");
		div.appendTo(this.view);
		div.fadeOut(1000,function(){
			div.remove();
		});
	}
});