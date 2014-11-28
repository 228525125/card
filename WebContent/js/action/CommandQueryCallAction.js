CommandQueryCallAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(CommandQueryCallAction.prototype, new Action,{
	doAction : function(){
		this.view.css("background-color","aqua");
		/*var div = $('<div style="font-size: 5px;">'+this.info.position+'</div>');
		div.css("color","blue");
		div.appendTo(this.view);
		div.fadeOut(5000,function(){
			div.remove();
		});*/
	}
});
