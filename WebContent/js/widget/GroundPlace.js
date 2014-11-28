
GroundPlace = function(position,view){
	this.position = position;
	this.view = view;
}

$.extend(GroundPlace.prototype, new Observer, {
	update: function(data){
		if(this.position==data.position){
			var action = ActionFactory.createAction(data,this.view);
			if(null!=action)
				action.doAction();
		}
	}
});