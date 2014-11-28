//用于显示提示信息，position是指位置的编号
NoticePlace = function(position,view){
	this.position = position;
	this.view = view;
}

$.extend(NoticePlace.prototype, new Observer, {
	update: function(data){
		if(this.position==data.position){
			var action = ActionFactory.createAction(data,this.view);
			if(null!=action)
				action.doAction();
		}
	}
});
