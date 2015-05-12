var SkillActionFactory = function(){
	var actionMap = new Map();
	return {
		createAction : function(info,view){
			return eval(actionMap.get(info.skill.SType));
		},
		register : function(skillName, actionObject){
			actionMap.put(skillName, actionObject);
		}
	}
}();