CommandShowAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	showPlayer : function(){
		var text = '<p style="margin: 0;padding: 0;">player:'+this.info.player.name+'</p>';
		return text;
	},
	showContainer : function(){
		var text = '<p style="margin: 0;padding: 0;">container:'+this.info.container.name+'</p>';
		return text;
	},
	showPlace : function(){
		var name = null==this.info.place.life || undefined == this.info.place.life ? '' : this.info.place.life.name;
		var text = '<p style="margin: 0;padding: 0;">place.position:'+this.info.place.position+' '+
		'| life:'+name+' '+
		'| cemetery:'+this.info.place.cemetery.size+' '+
		'| tricklist:'+this.info.place.trickList.size+'</p>';
		return text;
	},
	showCemetery : function(){
		var list = '';
		for(var i=0;i<this.info.cemetery.list.length;i++){
			list += this.info.cemetery.list[i].name;
			if((i+1)<this.info.cemetery.list.length)
				list += ',';
		}
		var text = '<p style="margin: 0;padding: 0;">cemetery:'+list+'</p>';
		return text;
	},
	showTricklist : function(){
		var list = '';
		for(var i=0;i<this.info.tricklist.list.length;i++){
			list += this.info.tricklist.list[i].name;
			if((i+1)<this.info.tricklist.list.length)
				list += ',';
		}
		var text = '<p style="margin: 0;padding: 0;">tricklist:'+list+'</p>';
		return text;
	},
	showCard : function(){
		
		var text = '';
		
		if(undefined!=this.info.card.hp){       //判断是否为life
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
					skill += 'CD:no]';
				else
					skill += 'CD:'+this.info.card.skillList[i].cooldownBout+']';
				if((i+1)<this.info.card.skillList.length)
					skill += ',';
			}
			
			text = '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+' '+
			'| hp:'+this.info.card.death.hp+' '+
			'| atk:'+this.info.card.attack.atk+' '+
			'| energy:'+this.info.card.move.energy+
			'| activate:'+this.info.card.activate.activation+'</p>'+
			'<p style="margin: 0;padding: 0;">attack:'+' '+
			'range:'+this.info.card.attack.range+' '+
			'| mode:'+Glossary.get(Glossary.Attack_Mode,this.info.card.attack.mode)+' '+
			'| speed:'+this.info.card.attack.speedChance+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">attacked:'+' '+
			'| attackBack:'+this.info.card.attacked.attackBack+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">conjure:'+' '+
			'power:'+this.info.card.conjure.power+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">move:'+' '+
			'type:'+Glossary.get(Glossary.Move_Type,this.info.card.move.type)+' '+
			'| flee:'+this.info.card.move.fleeChance+
			'| moveable:'+this.info.card.move.moveable+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">death:'+' '+
			'status:'+Glossary.get(Glossary.Death_Status,this.info.card.death.status)+'</p>'+
			'<p style="margin: 0;padding: 0;">call:'+' '+
			'consume:'+this.info.card.call.consume+'</p>'+
			'<p style="margin: 0;padding: 0;">skill:'+skill+'</p>'+
			'<p style="margin: 0;padding: 0;">buff:'+buff+'</p>';
		}else{
			text = '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+'</p>';
		}
		
		return text;
	},
	showSkill : function(){
		this.info.skill.consume = undefined==this.info.skill.consume ? '无' : this.info.skill.consume; 
		this.info.skill.cooldown = undefined==this.info.skill.cooldown ? '无' : this.info.skill.cooldown;
		this.info.skill.velocity = undefined==this.info.skill.velocity ? '无' : Glossary.get(Glossary.ActiveSkill_Velocity,this.info.skill.velocity);
		
		var text = '<p style="margin: 0;padding: 0;">skill:'+this.info.skill.name+' | 消耗:'+this.info.skill.consume+' | 冷却:'+this.info.skill.cooldown+' | 属性:'+Glossary.get(Glossary.ActiveSkill_Style,this.info.skill.style)+' | 发动方式:'+this.info.skill.velocity+'</p>'; 
		return text;
	},
	showTrick : function(){
		var text = '<p style="margin: 0;padding: 0;">trick:'+this.info.trick.name+'</p>';
		return text;
	},
	doAction : function(){
		var h = this.view.html();
		var res = '';
		if(null!=this.info.player)
			res += this.showPlayer();
		
		if(null!=this.info.container)
			res += this.showContainer();
		
		if(null!=this.info.place)
			res += this.showPlace();
		
		if(null!=this.info.cemetery)
			res += this.showCemetery();
		
		if(null!=this.info.tricklist)
			res += this.showTricklist();
		
		if(null!=this.info.card)
			res += this.showCard();
		
		if(null!=this.info.skill)
			res += this.showSkill();
		
		if(null!=this.info.trick)
			res += this.showTrick();
		
		res += '<p>--------------------------------------------------------------------------</p>';
		this.view.html(h+res);
		var scrollTop = this.view[0].scrollHeight;
        this.view.scrollTop(scrollTop+1);
	}
});