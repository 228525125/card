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
		
		if(null!=this.info.card){
			var buff = '';
			for(var i=0;i<this.info.card.buffList.length;i++){
				buff += this.info.card.buffList[i].name;
				if((i+1)<this.info.card.buffList.length)
					buff += ',';
			}
			
			var skill = '';
			for(var i=0;i<this.info.card.skillList.length;i++){
				skill += '['+this.info.card.skillList[i].name+',';
				if(undefined==this.info.card.skillList[i].cooldownBout)
					skill += '冷却:无]';
				else
					skill += '冷却:'+this.info.card.skillList[i].cooldownBout+']';
				if((i+1)<this.info.card.skillList.length)
					skill += ',';
			}
			
			res += '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+' '+
			'| hp:'+this.info.card.death.hp+' '+
			'| atk:'+this.info.card.attack.atk+' '+
			'| def:'+this.info.card.attacked.immuneDamageRatio+' '+
			'| energy:'+this.info.card.move.energy+
			'| activate:'+this.info.card.activate+'</p>'+
			'<p style="margin: 0;padding: 0;">attack:'+' '+
			'range:'+this.info.card.attack.range+' '+
			'| mode:'+Glossary.get(Glossary.Attack_Mode,this.info.card.attack.mode)+' '+
			'| type:'+Glossary.get(Glossary.Attack_Type,this.info.card.attack.type)+' '+
			'| accurate:'+this.info.card.attack.accurateChance+' '+
			'</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thump:'+this.info.card.attack.thumpChance+' '+
			'| speed:'+this.info.card.attack.speedChance+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">attacked:'+' '+
			'armour:'+Glossary.get(Glossary.Attacked_Type,this.info.card.attacked.armourType)+' '+
			'| attackBack:'+this.info.card.attacked.attackBackChance+' '+
			'| dodge:'+this.info.card.attacked.dodgeChance+' '+
			'| parry:'+this.info.card.attacked.parryChance+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">conjure:'+' '+
			'power:'+this.info.card.conjure.power+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">move:'+' '+
			'type:'+Glossary.get(Glossary.Move_Type,this.info.card.move.type)+' '+
			'| moveable:'+this.info.card.move.moveable+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">death:'+' '+
			'status:'+Glossary.get(Glossary.Death_Status,this.info.card.death.status)+'</p>'+
			'<p style="margin: 0;padding: 0;">call:'+' '+
			'consume:'+this.info.card.call.consume+'</p>'+
			'<p style="margin: 0;padding: 0;">skill:'+skill+'</p>'+
			'<p style="margin: 0;padding: 0;">buff:'+buff+'</p>';
		}
		
		if(null!=this.info.skill){
			this.info.skill.consume = undefined==this.info.skill.consume ? '无' : this.info.skill.consume; 
			this.info.skill.cooldown = undefined==this.info.skill.cooldown ? '无' : this.info.skill.cooldown;
			this.info.skill.velocity = undefined==this.info.skill.velocity ? '无' : Glossary.get(Glossary.ActiveSkill_Velocity,this.info.skill.velocity);
			res += '<p style="margin: 0;padding: 0;">skill:'+this.info.skill.name+' | 消耗:'+this.info.skill.consume+' | 冷却:'+this.info.skill.cooldown+' | 属性:'+Glossary.get(Glossary.ActiveSkill_Style,this.info.skill.style)+' | 发动方式:'+this.info.skill.velocity+'</p>';
		}
		
		if(null!=this.info.trick)
			res += '<p style="margin: 0;padding: 0;">trick:'+this.info.trick.name+'</p>';
		
		res += '<p>--------------------------------------------------------------------------</p>'
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
        this.view.scrollTop(scrollTop+1);
	}
});