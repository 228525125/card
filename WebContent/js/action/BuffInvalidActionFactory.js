var BuffInvalidActionFactory = function(){
	var actionMap = new Map();
	return {
		createAction : function(info,view){
			return eval(actionMap.get(info.buff.CType));
		},
		register : function(buffName, actionObject){
			actionMap.put(buffName, actionObject);
		}
	}
}();