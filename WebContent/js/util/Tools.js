//暂时没用
var Tools = function (){
	
	return {
		test : function(res){
			var ret = 0;
			
			for(var attr in res){
				if(attr==Glossary.Resource_Type_Gold)
					ret = res[attr];
			}
			
			return ret;
		}
	}
	
}();