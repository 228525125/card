
Container = function(){
	
}

$.extend(Container.prototype, new Observable(), {
	act: function(position, action, info){	
		this.notifyObservers({position: position, action: action, info: info});
	},
	getPlace: function(position){
		return this.observablelist.get(position);
	}
});