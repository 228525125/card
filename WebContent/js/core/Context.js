//全局对象

function Context() {
	
	this.map = new Map(); 
	this.control = null;
	this.notice = null;
	this.optionList = null;
	this.processSequence = 0;
	this.own = null;    //仅有id、name、account属性，用于判断当前操作者
	this.timer = null;
}

Context.prototype.put = function(key,value) {
	this.map.put(key,value);
};

Context.prototype.get = function(key) {
	return this.map.get(key);
};

Context.prototype.setControl = function(player) {
	this.control = player;
};

Context.prototype.getControl = function() {
	return this.control;
};

Context.prototype.setNotice = function(notice) {
	this.notice = notice;
};

Context.prototype.getNotice = function() {
	return this.notice;
};

Context.prototype.setOptionList = function(optionList) {
	this.optionList = optionList;
};

Context.prototype.getOptionList = function() {
	return this.optionList;
};

Context.prototype.setProcessSequence = function(sequence) {
	this.processSequence = sequence;
};

Context.prototype.getProcessSequence = function() {
	return this.processSequence;
};

Context.prototype.setOwn = function(o) {
	this.own = o;
};

Context.prototype.getOwn = function() {
	return this.own;
};

Context.prototype.beginSyn = function() {
	if(null!=timer)
		clearInterval(timer);
	timer = setInterval("syn()",8000);
};

Context.prototype.stopSyn = function() {
	clearInterval(timer);
};

Context.prototype.reloadLandform = function() {
	var ground = this.get(this.Ground);
	var keys = Object.getOwnPropertyNames(ground.landform);
	
	for(var i=0;i<keys.length;i++){
		var key = keys[i];
		var value = ground.landform[key];
		
		var place = ground.getPlace(key);
		var landformName = Glossary.get(Glossary.Ground_Landform,value);
		if('山'==landformName)
			place.view.css("background-color","#EFE4B0");
		else if('丘林'==landformName)
			place.view.css("background-color","#80FF80");
		else if('森林'==landformName)
			place.view.css("background-color","#22B14C");
	}
};

Context.prototype.reloadBuilding = function() {
	var ground = this.get(this.Ground);
	
	for(var i=0;i<ground.buildingList.length;i++){
		var building = ground.buildingList[i];
		var buildingName = building.name;
		
		var place = ground.getPlace(building.position);
		
		if('城市'==buildingName)
			place.view.css("background-color","#C8BFE7");
		else if('桥'==buildingName)
			place.view.css("background-color","#FFFFFF");
		else if('传送站'==buildingName)
			place.view.css("background-color","#80FFFF");
	}
};

Context.prototype.reloadTreasure = function() {
	var ground = this.get(this.Ground);
	
	for(var i=0;i<ground.treasureList.length;i++){
		var treasure = ground.treasureList[i];
		var position = treasure.position;
		
		var place = ground.getPlace(position);
		place.view.html('【物品】');
	}
};

Context.prototype.reloadCorps = function() {
	var ground = this.get(this.Ground);
	
	for(var i=0;i<ground.corpsList.length;i++){
		var corps = ground.corpsList[i];
		var position = corps.position;

		var place = ground.getPlace(position);
		
		if(corps.move.hide)
			place.view.css("background-color","gray");
		else
			place.view.html(corps.name);
	}
};

Context.prototype.refurbishGround = function() {
	var ground = this.get(Context.GROUND);
	
	for(var i=1;i<=ground.xBorder;i++){
		for(var n=1;n<=ground.yBorder;n++){
			var place = ground.getPlace(""+i+"8008"+n);
			place.view.html("");
			place.view.css("background-color","");
		}
	}
	
	Context.reloadLandform();
	Context.reloadBuilding();
	Context.reloadTreasure();
	Context.reloadCorps();
};

Context.GROUND = 'Ground';

var Context = new Context();