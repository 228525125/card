//判断life是否能行动
LifeCardActivateAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	doAction : function(){
		/*if(this.info.activate){
			//this.view.css("background-color","yellow");
			//var v = this.view;
			//setTimeout(function(){v.css("background-color","");},1000);
			
			var html = this.view.html();
			html = '*'+html;
			this.view.html(html);
		}else{
			var html = this.view.html();
			html = html.replace('*','');
			this.view.html(html);
		}*/
	}
});