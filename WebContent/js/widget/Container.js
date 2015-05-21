/**
 * 容器，对应后台的Container
 */
Container = jClass(Observable, {
	
	init: function(){
		
		this.superFunction();
	},
	
	act: function(position, action, info){	
		this.notifyObservers({position: position, action: action, info: info});
	},
	
	getPlace: function(position){
		return this.observablelist.get(position);
	}
});