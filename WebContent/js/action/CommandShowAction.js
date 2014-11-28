CommandShowAction = function(info,view){
	this.info = info;
	this.view = view;
}

$.extend(CommandShowAction.prototype, new Action, {
	doAction : function(){
		var h = this.view.html();
		var res = '';
		if(null!=this.info.player)
			res += '<p style="margin: 0;padding: 0;">player:'+this.info.player.name+'</p>';
		
		if(null!=this.info.container)
			res += '<p style="margin: 0;padding: 0;">container:'+this.info.container.name+'</p>';
		
		if(null!=this.info.place)
			res += '<p style="margin: 0;padding: 0;">place.position:'+this.info.place.position+'</p>';
		
		if(null!=this.info.cemetery)
			res += '<p style="margin: 0;padding: 0;">cemetery:'+this.info.cemetery.size+'</p>';
		
		if(null!=this.info.tricklist)
			res += '<p style="margin: 0;padding: 0;">tricklist:'+this.info.tricklist.size+'</p>';
		
		if(null!=this.info.card)
			res += '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+' | life:'+this.info.card.death.hp+' | atk:'+this.info.card.attack.atk+' | def:'+this.info.card.attacked.immuneDamageRatio+' | energy:'+this.info.card.move.energy+'</p>';
		
		if(null!=this.info.skill)
			res += '<p style="margin: 0;padding: 0;">skill:'+this.info.skill.name+' | 消耗:'+this.info.skill.consume+' | 冷却:'+this.info.skill.cooldown+' | 属性:'+this.info.skill.style+' | 发动方式:'+this.info.skill.velocity+'</p>';
		
		if(null!=this.info.trick)
			res += '<p style="margin: 0;padding: 0;">trick:'+this.info.trick.name+'</p>';
		
		res += '<p>--------------------------------------------------------------------------</p>'
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
        this.view.scrollTop(scrollTop+1);
	}
});