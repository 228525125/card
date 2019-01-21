Action = jClass({
	
	init: function(info,view){
		this.info = info;
		this.view = view;
	},
	
	doAction: abstractmethod
});