//缓存，用于缓存一些命令执行中的数据
var Buffer = function(){
	var selectContainer = null;
	var selectPosition = null;        //用于保存选择过的位置
	var queryContainer = null;
	var queryPositionList = null;         //用于保存查询过的位置
	
	return {
		setSelectContainer : function(container){
			selectContainer = container;
		},
		setSelectPosition : function(position){
			selectPosition = position;
		},
		setQueryContainer : function(container){
			queryContainer = container;
		},
		setQueryPositionList : function(positionList){
			queryPositionList = positionList;
		},
		cancelSelect: function(){         //取消上次选择显示效果
			if(null!=selectPosition){    
				var selectPlace = selectContainer.getPlace(selectPosition);
				if(undefined!=selectPlace&&null!=selectPlace)
					selectPlace.view.css("color","");
			}
		},
		cancelQuery: function(){    //取消上次查询显示效果
			if(null!=queryPositionList){           
				for(var i=0;i<queryPositionList.length;i++){
					var queryPlace = queryContainer.getPlace(queryPositionList[i]);
					queryPlace.view.css("background-color","");
				}
				Context.reloadLandform();
				Context.reloadBuilding();
			}
		}
	}
}();