var Glossary = function(){
	var typeMap = new Map;
	typeMap.put('Attack_Mode',new Map());
	typeMap.put('Attack_Type',new Map());
	typeMap.put('Attacked_Type',new Map());
	typeMap.put('Death_Status',new Map());
	typeMap.put('Move_Type',new Map());
	typeMap.put('ActiveSkill_Velocity',new Map());
	typeMap.put('ActiveSkill_Style',new Map());
	typeMap.put('ActiveSkill_Func',new Map());
	typeMap.put('Ground_Landform',new Map());
	typeMap.put('Ground_Building',new Map());
	typeMap.put('Building_Product',new Map());
	typeMap.put('Building_Status',new Map());
	typeMap.put('Buff_Type',new Map());
	typeMap.put('Card_Type',new Map());
	typeMap.put('Resource_Type',new Map());
	
	return {
		add: function(type,code,name){
			var map = typeMap.get(type);
			if(undefined!=map && null!=map)
				map.put(code,name);
		},
		get: function(type,code){
			var map = typeMap.get(type);
			if(undefined!=map && null!=map)
				return map.get(code);
			else
				return '';
		},
		Attack_Mode : 'Attack_Mode',
		Attack_Type : 'Attack_Type',
		Attacked_Type : 'Attacked_Type',
		Death_Status : 'Death_Status',
		Move_Type : 'Move_Type',
		ActiveSkill_Velocity : 'ActiveSkill_Velocity',
		ActiveSkill_Style : 'ActiveSkill_Style',
		ActiveSkill_Func : 'ActiveSkill_Func',
		Ground_Landform : 'Ground_Landform',
		Ground_Building : 'Ground_Building',
		Ground_Building_Town : 'Ground_Building_Town',
		Ground_Building_Call : 'Ground_Building_Call',
		Building_Product : 'Building_Product',
		Building_Status : 'Building_Status',
		Buff_Type : 'Buff_Type',
		Card_Type : 'Card_Type',
		Resource_Type : 'Resource_Type',
		
		//------------------------常数----------------------
		Resource_Type_Gold : '701',
		Resource_Type_Wood : '702',
		Resource_Type_Stone : '703',
		Resource_Type_Ore : '704',
		Resource_Type_EmpiricValue : '710',
		Resource_Type_SkillCount : '720'
	}
}();