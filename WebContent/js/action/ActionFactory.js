var ActionFactory = function(){
	var actionMap = new Map();
	return {
		createAction : function(data,view){
			var msg = '<p style="margin: 0;padding: 0;">[action : '+data.action+',position : '+data.position+']</p>'
			command_output_val(msg);
			return eval(actionMap.get(data.action));
		},
		register : function(actionName, actionObject){
			actionMap.put(actionName, actionObject);
		}
	}
}();