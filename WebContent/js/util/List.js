/**
 * 它继承了数组，但它覆盖了组数的一些方法用来处理GroundPlace、NoticePlace
 */
List = Array.extend({

	init : function() {
		for(var i=0;i<arguments.length;i++)
			this[i] = arguments[i];
	},
	
	remove : function(s) {
		if(undefined!=s.position){
			for (var i = 0; i < this.length; i++) {  
		        if (s.position == this[i].position)  
		            this.splice(i, 1);  
		    }
		}else{
			for (var i = 0; i < this.length; i++) {  
		        if (s == this[i])  
		            this.splice(i, 1);  
		    }
		}
	},
	
	indexOf : function(s) {
		if(undefined!=s.position){
			for (var i = 0; i < this.length; i++) {  
		        if (s.position == this[i].position)  
		            return i;  
		    }
		}else{
			for (var i = 0; i < this.length; i++) {  
		        if (s == this[i])  
		            return i;  
		    }
		}
	},
	
	get : function(position) {
		if(undefined!=position){
			for (var i = 0; i < this.length; i++) {  
		        if (position == this[i].position)  
		            return this[i];  
		    }
		}
	},
	
	insertAt : function( index, value ) {
		var part1 = this.slice( 0, index );
		var part2 = this.slice( index );
		part1.push( value );
		return( part1.concat( part2 ) );
	},
	
	removeAt : function( index ) {
		var part1 = this.slice( 0, index );
		var part2 = this.slice( index );
		part1.pop();
		return( part1.concat( part2 ) );
	}
});
