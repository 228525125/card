var CommandFactory = function(){
	var command = null;
	return {
		createCommand : function(action, data){
			if(-1!=action.indexOf('Query')){      //跟查询相关的
				Buffer.cancelQuery();
				command = new QueryCommand(action,data);
				
				Buffer.setQueryContainer(Context.get(Context.Ground));
				Buffer.setQueryPositionList(data.positionList);
			}else if(-1!=action.indexOf('Context') || -1!=action.indexOf('Ground_LoadMap') || -1!=action.indexOf('Command_Switch')){       //与比赛相关，但与具体元素无关的（独立的一块区域显示）
				command = new ContextCommand(action,data);   //这里position硬编码1，1表示<div>command_show
			}else if('Command_Show'==action){              //（独立的一块区域显示）
				command = new ShowCommand(action,data);  
			}else if('Player_Resource'==action || 'Player_Ration'==action || 'Player_Bout'==action){              //（独立的一块区域显示）
				command = new ControlCommand(action,data);
			}else
				command = new GeneralCommand(action,data);
			
			return command;
		}
	}
}();