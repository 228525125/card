/**
 * 被观察者
 */
Observable = jClass({
	
	init: function(){
		this.observablelist = new Array();
	},
	
	addObserver: function(o){
		this.observablelist.push(o);
	},
	
	notifyObservers: function(info){
		for(var i=0;i<this.observablelist.length;i++){
			this.observablelist[i].update(info);
		}
	}
});