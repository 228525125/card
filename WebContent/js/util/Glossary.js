var Glossary = function(){
	var typeMap = new Map;
	typeMap.put('Attack_Mode',new Map());
	typeMap.put('Attack_Type',new Map());
	typeMap.put('Attacked_Type',new Map());
	typeMap.put('Death_Status',new Map());
	typeMap.put('Move_Type',new Map());
	
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
		Move_Type : 'Move_Type'
	}
}();