CommandShowAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	showPlayer : function(){
		var text = '<p style="margin: 0;padding: 0;">当前玩家:'+this.info.player.name+'</p>';
		return text;
	},
	showContainer : function(){
		var text = '<p style="margin: 0;padding: 0;">容器:'+this.info.container.name+'</p>';
		return text;
	},
	showPlace : function(){
		var life = null==this.info.place.life || undefined == this.info.place.life ? '' : this.info.place.life.name;
		var text = '<p style="margin: 0;padding: 0;">坐标:'+this.info.place.position+' '+
		'| life:'+life+' '+
		'| 墓地:'+this.info.place.cemetery.size+' '+
		'| 陷阱:'+this.info.place.trickList.size+'</p>';
		return text;
	},
	showBuilding : function(){
		var optionList = Context.getOptionList();
		
		for(var i=0;i<optionList.length;i++){
			optionList[i].html('');
			optionList[i].attr("title","option"+i);
		}
		
		var option = '';
		for(var i=0;i<this.info.building.options.length;i++){
			var optionName = this.info.building.options[i].name;
			option += optionName;
			
			optionList[i].html(optionName);
			if((i+1)<this.info.building.options.length)
				option += ',';
		}
		
		var building = null==this.info.building || undefined == this.info.building ? '' : this.info.building.name;
		var text = '<p style="margin: 0;padding: 0;">建筑:'+building+' '+
		'| 占领者:'+this.info.building.player.name+' '+
		'| 等级:'+this.info.building.level+ ' ' +
		'| 选项:'+option+' '+
		'</p>';
		return text;
	},
	showOption : function(){
		var option = null==this.info.option || undefined == this.info.option ? '' : this.info.option.name;
		var text = '<p style="margin: 0;padding: 0;">选项:'+option+' '+
		'</p>';
		return text;
	},
	showCemetery : function(){
		var list = '';
		for(var i=0;i<this.info.cemetery.list.length;i++){
			list += this.info.cemetery.list[i].name;
			if((i+1)<this.info.cemetery.list.length)
				list += ',';
		}
		var text = '<p style="margin: 0;padding: 0;">墓地:'+list+'</p>';
		return text;
	},
	showTricklist : function(){
		var list = '';
		for(var i=0;i<this.info.tricklist.list.length;i++){
			list += this.info.tricklist.list[i].name;
			if((i+1)<this.info.tricklist.list.length)
				list += ',';
		}
		var text = '<p style="margin: 0;padding: 0;">陷阱:'+list+'</p>';
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
			
			var optionList = Context.getOptionList();
			
			for(var i=0;i<optionList.length;i++){
				optionList[i].html('');
				optionList[i].attr("title","skill"+i);
			}
			
			var skill = '';
			for(var i=0;i<this.info.card.skillList.length;i++){
				var skillName = this.info.card.skillList[i].name;
				skill += '['+skillName+',';

				if(undefined==this.info.card.skillList[i].cooldownBout)
					skill += 'CD:no]';
				else
					skill += 'CD:'+this.info.card.skillList[i].cooldownBout+']';
				if((i+1)<this.info.card.skillList.length)
					skill += ',';
				
				optionList[i].html(skillName);
			}
			
			var weapon = '<p style="margin: 0;padding: 0;">武器:';
			if(null!=this.info.card.attack.weapon){
				weapon += this.info.card.attack.weapon.name+' '+
				'| 攻击:'+this.info.card.attack.weapon.atk+' '+
				'| 持久:'+this.info.card.attack.weapon.wear+' '+'</p>';
			}
			
			
			text = '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+'['+this.info.card.player.name+'] '+
			'| hp:'+this.info.card.death.hp+' '+
			'| atk:'+this.info.card.attack.atk+' '+
			'| 移动:'+this.info.card.move.energy+
			'| 激活:'+this.info.card.activate.activation+'</p>'+
			'<p style="margin: 0;padding: 0;">攻击:'+' '+
			'距离:'+this.info.card.attack.range+' '+
			'| 类型:'+Glossary.get(Glossary.Attack_Mode,this.info.card.attack.mode)+' '+
			'| 速度:'+this.info.card.attack.speedChance+' '+'</p>'+
			weapon+
			'<p style="margin: 0;padding: 0;">防守:'+' '+
			'| 护甲:'+this.info.card.attacked.armour+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">施法:'+' '+
			'能量:'+this.info.card.conjure.power+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">移动:'+' '+
			'类型:'+Glossary.get(Glossary.Move_Type,this.info.card.move.type)+' '+
			'| 躲避:'+this.info.card.move.flee+
			'| 激活:'+this.info.card.move.moveable+' '+'</p>'+
			'<p style="margin: 0;padding: 0;">生命:'+' '+
			'状态:'+Glossary.get(Glossary.Death_Status,this.info.card.death.status)+'</p>'+
			'<p style="margin: 0;padding: 0;">招募:'+' '+
			'消耗:'+this.info.card.call.consume+'</p>'+
			'<p style="margin: 0;padding: 0;">技能:'+skill+'</p>'+
			'<p style="margin: 0;padding: 0;">buff:'+buff+'</p>';
		}else if(this.info.card.id>=10150001 && this.info.card.id<=10159999){           //表示魔法卡
			text = '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+'</p>'+
			'<p style="margin: 0;padding: 0;">施法:'+' '+
			'| 能量 '+this.info.card.apply.consume+'</p>'+
			'<p style="margin: 0;padding: 0;">描述:'+this.info.card.depiction+'</p>';
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
		
		if(null!=this.info.building)
			res += this.showBuilding();
		
		if(null!=this.info.option)
			res += this.showOption();
		
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