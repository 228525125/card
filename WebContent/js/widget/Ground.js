/**
 * 战场
 */
Ground = jClass(Container, {
	
	xBorder : 1,
	yBorder : 1,
	
	init: function(xBorder, yBorder){
		
		this.superFunction();
		this.xBorder = xBorder;
		this.yBorder = yBorder;
	}
});