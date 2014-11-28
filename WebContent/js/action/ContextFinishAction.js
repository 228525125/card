
ContextFinishAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(ContextFinishAction.prototype, new Action, {
	doAction : function(){
		var h = this.view.html();
		this.view.html(h+'<p style="margin: 0;padding: 0;">GameOver！</p>');
		
		var scrollTop = this.view[0].scrollHeight;
		this.view.scrollTop(scrollTop+1);
	}
});