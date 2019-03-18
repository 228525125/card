/**
 * 战场
 */
Ground = Container.extend({
	
	id : 0,
	xBorder : 1,
	yBorder : 1,
	landform : new Map(),
	buildingList : [],
	treasureList : [],
	corpsList : [],
	
	init: function(xBorder, yBorder){
		
		this.superFunction();
		this.xBorder = xBorder;
		this.yBorder = yBorder;
	}
});