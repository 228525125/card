
GroundPlace = jClass(Observer,{
	
	init: function(position,view) {
		this.position = position;
		this.view = view;
	},
	
	update: function(data){
		if(this.position==data.position){
			var action = ActionFactory.createAction(data,this.view);
			if(null!=action)
				action.doAction();
		}
	}
});