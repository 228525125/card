CommandQueryCallAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
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
