	
CardGroupPlace = jClass(Observer,{
	
	init: function(view) {
		this.view = view;
	},
	
	update: function(data){
		if("CardGroup_Add" == data.action){
			this.card = data.card;
		}else if("CardGroup_Remove" == data.action){
			this.card = null;
		}
	}
});