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

/**
* 以字符串形式返回o的类型
*/
function type(o) {
    var t,c,n;

    //处理null值的情况
    if(o === null) return 'null';
    
    //处理NaN的情况
    if(o !== o) return 'nan';

    //如果typeof的值不是“object”，则返回这个值
    //这可以识别出原始值的类型和函数
    if((t = typeof o) !== "object") return t;    
    
    //返回对象的类名，除非为“Object”
    //这可以识别出大多数内置对象
    if((c = classof(o)) !== "Object") return c;

    //如果对象构造函数的名字存在的话，则返回它
    if(o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) return n;
    
    //其他的类型都无法判别
    return "Object";
}

//返回对象的类
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
};