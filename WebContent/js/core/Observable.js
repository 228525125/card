/**
 * 被观察者
 */
Observable = Object.extend({
	
	init: function(){
		this.observablelist = new List();
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