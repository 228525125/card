var ActionFactory = function(){
	var actionMap = new Map();
	return {
		createAction : function(data,view){		
			return eval(actionMap.get(data.action));
		},
		register : function(actionName, actionObject){
			actionMap.put(actionName, actionObject);
		}
	}
}();