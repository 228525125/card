var ActionFactory = function(){
	var actionMap = new Map();
	return {
		createAction : function(data,view){
			var msg = '<p style="margin: 0;padding: 0;">action : '+data.action+',description : '+(data.info.description ? data.info.description : ' ')+'</p>';
			command_output_val(msg,data.action);
			return eval(actionMap.get(data.action));
		},
		register : function(actionName, actionObject){
			actionMap.put(actionName, actionObject);
		}
	};
}();