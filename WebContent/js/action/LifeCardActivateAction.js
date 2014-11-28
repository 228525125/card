//判断life是否能行动
LifeCardActivateAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(LifeCardActivateAction.prototype, new Action, {
	doAction : function(){
		if(this.info.available)
			this.view.css("color","yellow");
	}
});