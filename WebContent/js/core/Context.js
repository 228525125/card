//全局对象
var Context = function(){
	var playerMap = new Map();
	var map = new Map(); 
	var control = null;
	var notice = null;
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
		}
		/*,
		getQueue: function(){
			return queue;
		},
		setQueue: function(array){
			queue = array;
		}*/
	}
}();