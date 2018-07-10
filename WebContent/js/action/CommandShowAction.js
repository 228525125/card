CommandShowAction = jClass(Action, {
	
	init: function(info,view){
		
		this.superFunction(info,view);
	},
	
	showPlayer : function(){
		var text = '<p style="margin: 0;padding: 0;">当前玩家:'+this.info.player.name+'('+this.info.player.resource.gold+'/'+this.info.player.resource.wood+'/'+this.info.player.resource.stone+'/'+this.info.player.resource.ore+')'+'</p>';
		return text;
	},
	showGround : function(){
		var text = '<p style="margin: 0;padding: 0;">容器:'+this.info.ground.name+'</p>';
		return text;
	},
	showPlace : function(){
		var life = null==this.info.place.life || undefined == this.info.place.life ? '无' : this.info.place.life.name;
		var treasure = null!=this.info.place.treasure ? this.info.place.treasure.name : '无';
		var text = '<p style="margin: 0;padding: 0;">坐标:'+this.info.place.position+' '+
		'| life:'+life+' '+
		'| 物品:'+treasure + ' '+
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
			var allow = this.info.building.options[i].allow;
			var spacingRemainBout = this.info.building.options[i].spacingRemainBout;
			var executeRemainBout = this.info.building.options[i].executeRemainBout;
			
			option += optionName+'['+(allow ? '是' : '否')+']';
			optionName += '<br>('+spacingRemainBout+'|'+executeRemainBout+')';
			optionList[i].html(optionName);
			if((i+1)<this.info.building.options.length)
				option += ' | ';
		}
		
		/*var product = '';
		for(var i=0;i<this.info.building.products.length;i++){
			var productName = this.info.building.products[i].name;
			var productLevel = this.info.building.products[i].upgrade.level;
			product += productName;
			product += '('+productLevel+')';
			
			if((i+1)<this.info.building.products.length)
				product += ' | ';
		}*/
		
		var building = '';
		var category = Glossary.get(Glossary.Ground_Building, this.info.building.category);
		if(Glossary.Ground_Building_Town==category){
			for(var i=0;i<this.info.building.buildings.length;i++){
				var buildingName = this.info.building.buildings[i].name;
				
				building += ''+i+buildingName;
				if(Glossary.Ground_Building_Call==Glossary.get(Glossary.Ground_Building, this.info.building.buildings[i].category))
					building += '('+this.info.building.buildings[i].nop+'/'+this.info.building.buildings[i].yield+')';
				
				if((i+1)<this.info.building.buildings.length)
					building += ' | ';
			}
		}
		
		var buildingName = null==this.info.building || undefined == this.info.building ? '' : this.info.building.name;
		var text = '<p style="margin: 0;padding: 0;">建筑:'+buildingName+' '+
		'| 占领者:'+(undefined==this.info.building.player ? '' : this.info.building.player.name)+' '+
		'| 等级:'+this.info.building.upgrade.level+ ' '+
		'| 状态:'+Glossary.get(Glossary.Building_Status,this.info.building.status);
		text += '<p style="margin: 0;padding: 0;">建造费用:'+'金币 '+this.info.building.consume.gold+' | 木材 '+this.info.building.consume.wood+' | 石材 '+this.info.building.consume.stone+' | 矿 '+this.info.building.consume.ore+'</p>';
		if(null!=this.info.building.upgrade.requirement)
			text += '<p style="margin: 0;padding: 0;">升级费用:'+'金币 '+ this.info.building.upgrade.requirement.gold+' | 木材 '+this.info.building.upgrade.requirement.wood+' | 石材 '+this.info.building.upgrade.requirement.stone+' | 矿 '+this.info.building.upgrade.requirement.ore+'</p>';
		if(Glossary.Ground_Building_Town==category)
			text += '<p style="margin: 0;padding: 0;">内部:'+building+'</p>';
		if(Glossary.Ground_Building_Call==category){
			text += '<p style="margin: 0;padding: 0;">产量:'+this.info.building.yield+'</p>';
			text += '<p style="margin: 0;padding: 0;">招募:'+this.info.building.nop+'</p>';
		}
		/*if(''!=product)
			text += '<p style="margin: 0;padding: 0;">产品:'+product+'</p>';*/ 
		
		text += '<p style="margin: 0;padding: 0;">选项:'+option+'</p></p>';
		return text;
	},
	showOption : function(){
		var text = '<p style="margin: 0;padding: 0;">选项:';
		if(null != this.info.option && undefined != this.info.option){
			text += this.info.option.name + ' ' +
			'['+(this.info.option.allow ? '是' : '否') + ']' + 
			'</p>';
		}
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
		if(true==this.info.card.hero){
			for(var i=0;i<this.info.card.skillList.length;i++){
				var skillName = this.info.card.skillList[i].name;
				skill += '['+skillName+',';

				if(undefined==this.info.card.skillList[i].cooldownRemain)
					skill += 'CD:no]';
				else
					skill += 'CD:'+this.info.card.skillList[i].cooldownRemain+']';
				if((i+1)<this.info.card.skillList.length)
					skill += ',';
				
				optionList[i].html(skillName);
			}
		}
		
		var troops = '';
		if(true==this.info.card.hero){
			for(var i=0;i<this.info.card.troops.length;i++){
				var corpsName = this.info.card.troops[i].name;
				troops += corpsName;
				
				if((i+1)<this.info.card.troops.length)
					troops += ',';
			}
		}
		
		text = '<p style="margin: 0;padding: 0;">card:'+this.info.card.name+'['+this.info.card.player.name+'] '+
		'| atk:'+this.info.card.attack.atk+' '+
		'| 移动:'+this.info.card.move.energy+ ' '+
		'| 激活:'+this.info.card.activate.activation+'</p>'+
		'<p style="margin: 0;padding: 0;">攻击:'+' '+
		'距离:'+this.info.card.attack.range+' '+
		'| 类型:'+Glossary.get(Glossary.Attack_Mode,this.info.card.attack.mode)+' '+
		'| 速度:'+this.info.card.activate.speed+' '+
		'| 激活:'+this.info.card.attack.attackable+'</p>'+
		'<p style="margin: 0;padding: 0;">防守:'+' '+
		'def:'+this.info.card.attacked.def+' '+
		'| hp:'+this.info.card.death.hp+'['+this.info.card.death.hpLimit+']'+' '+ 
		'| 反击:'+this.info.card.attacked.fightBack+' '+'</p>'+
		'<p style="margin: 0;padding: 0;">移动:'+' '+
		'类型:'+Glossary.get(Glossary.Move_Type,this.info.card.move.type)+' '+
		'| 躲避:'+this.info.card.move.flee+' '+
		'| 精力:'+this.info.card.move.energy+' '+
		'| 激活:'+this.info.card.move.moveable+' '+'</p>'+
		'<p style="margin: 0;padding: 0;">生命:'+' '+
		'状态:'+Glossary.get(Glossary.Death_Status,this.info.card.death.status)+'</p>'+
		'<p style="margin: 0;padding: 0;">招募:'+' '+
		'人数:'+this.info.card.call.nop+' '+
		'| 单位人口:'+this.info.card.call.ration+' '+
		'| 消耗:'+this.info.card.call.consume.gold+'/'+this.info.card.call.consume.ore+'</p>'+
		'<p style="margin: 0;padding: 0;">等级:'+' '+
		'level:'+this.info.card.upgrade.level+' '+
		'| 经验值:'+this.info.card.upgrade.empiricValue.value+'['+this.info.card.upgrade.requirement.value+']'+' '+
		'| 技能点:'+(this.info.card.hero?this.info.card.upgrade.skillCount.count:' ')+'</p>'+
		'<p style="margin: 0;padding: 0;">buff:'+buff+'</p>';
		
		if(true==this.info.card.hero){
			text += '<p style="margin: 0;padding: 0;">技能:'+skill+'</p>'+
			'<p style="margin: 0;padding: 0;">队伍:'+troops+'</p>';
		}
		
		
		return text;
	},
	showSkill : function(){
		this.info.skill.consume = undefined==this.info.skill.consume ? '无' : this.info.skill.consume; 
		this.info.skill.cooldown = undefined==this.info.skill.cooldown ? '无' : this.info.skill.cooldown;
		this.info.skill.velocity = undefined==this.info.skill.velocity ? '无' : Glossary.get(Glossary.ActiveSkill_Velocity,this.info.skill.velocity);
		
		var text = '<p style="margin: 0;padding: 0;">skill:'+this.info.skill.name+' | 消耗:'+this.info.skill.consume+' | 冷却:'+this.info.skill.cooldown+' | 等级:'+this.info.skill.upgrade.level+'</p>'; 
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
		
		if(null!=this.info.ground)
			res += this.showGround();
		
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