//全局对象
var Context = function(){
	var playerMap = new Map();
	var map = new Map(); 
	var control = null;
	var notice = null;
	var optionList = null;
	var processSequence = 0;
	var own = null;    //仅有id、name、account属性，用于判断当前操作者
	var timer = null;
	//var queue = new Array();   //目前无法测试
	return {
		addPlayer:function(player){
			playerMap.put(player.id, player);
		},
		getPlayer:function(playerId){
			return playerMap.get(playerId);
		},
		put:function(key,value){
			map.put(key,value);
		},
		get:function(key){
			return map.get(key);
		},
		getControl: function(){
			return control;
		},
		setControl: function(player){
			control = player;
		},
		getNotice: function(){
			return notice;
		},
		setNotice: function(ne){
			notice = ne;
		},
		getOptionList: function(){
			return optionList;
		},
		setOptionList: function(ol){
			optionList = ol;
		},
		setProcessSequence: function(sequence){
			processSequence = sequence;
		},
		getProcessSequence: function(){
			return processSequence;
		},
		beginSyn: function(){
			if(null!=timer)
				clearInterval(timer);
			timer = setInterval("syn()",10000);
		},
		stopSyn: function(){
			clearInterval(timer);
		},
		setOwn: function(o){
			own = o;
		},
		getOwn: function(){
			return own;
		},
		reloadLandform: function(){
			var landform = this.get(this.Landform);
			var keys = Object.getOwnPropertyNames(landform);
			
			for(var i=0;i<keys.length;i++){
				var key = keys[i];
				var value = landform[key];
				var ground = this.get(this.Ground);
				var place = ground.getPlace(key);
				var landformName = Glossary.get(Glossary.Ground_Landform,value);
				if('山'==landformName)
					place.view.css("background-color","#EFE4B0");
				else if('丘林'==landformName)
					place.view.css("background-color","#80FF80");
				else if('森林'==landformName)
					place.view.css("background-color","#22B14C");
			}
		},
		reloadBuilding : function(){
			var buildingList = this.get(this.BuildingList);
			
			for(var i=0;i<buildingList.length;i++){
				var building = buildingList[i];
				var buildingName = building.name;
				
				var ground = this.get(this.Ground);
				var place = ground.getPlace(building.position);
				
				if('城市'==buildingName)
					place.view.css("background-color","#C8BFE7");
				else if('桥'==buildingName)
					place.view.css("background-color","#FFFFFF");
			}
		},
		Ground : 'Ground',
		Landform : 'Landform',
		BuildingList : 'BuildingList'
		/*,
		getQueue: function(){
			return queue;
		},
		setQueue: function(array){
			queue = array;
		}*/
	}
}();