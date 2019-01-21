/**
 * Set是一种数据结构，用以表示非重复值的无序集合
 */
function Set() {
	this.values = {};                 //集合数据保存在对象的属性里
	this.n = 0;                       //集合中值的个数
	this.add.apply(this, arguments);  //把所有参数都添加进这个集合
	
}

// 将每个参数都添加至集合中
Set.prototype.add = function() {
	for(var i=0; i<arguments.length; i++){     //遍历每个参数
		var val = arguments[i];                //待添加到集合中的值
		var str = Set._v2s(val);               //把它转换为字符串
		if(!this.values.hasOwnProperty(str)){  //如果不在集合中
			this.values[str] = val;            //将字符串和值对应起来
			this.n++;                          //集合中值的计数加一
		}
	}
	return this;
};

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function() {
	for(var i=0; i<arguments.length;i++){
		var str = Set._v2s(arguments[i]);       
		if(this.values.hasOwnProperty(str)){   //如果它在集合中
			delete this.values[str];           //删除它
			this.n--;                          //计数器减一
		}
	}
	return this;
};

// 如果集合包含这个值，则返回true，否则，返回false
Set.prototype.contains = function(value) {
	return this.values.hasOwnProperty(Set._v2s(value));
};

// 返回集合大小
Set.prototype.size = function() {
	return this.n;
};

// 遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
	for(var s in this.values){                    //遍历集合中的所有字符串
		if(this.values.hasOwnProperty(s))         //忽略继承的属性
			f.call(context, this.values[s]);      //调用f，传入value
	}
};

Set._v2s = function(val) {
	switch(val){
		case undefined: return 'u';                               //特殊的原始值
		case null:      return 'n';                               //值只有一个字母
		case true:      return 't';
		case false:     return 'f';
		default: switch (typeof val) {
					 case 'number': return '#'+val;               //数字都带有#前缀
					 case 'string': return '"'+val;               //字符串都带有"前缀
					 default:       return '@'+objectId(val);     //对象 和 函数 都带有@前缀
				 }
	}
	
	function objectId(o) {
		var prop = "|**objectid**|";            //私有的属性，用以存放id
		if(!o.hasownProperty(prop))             //如果对象没有id
			o[prop] = Set._v2s.next++;          //将下一个值赋给
		return o[prop];                         //返回这个id
	}
};

Set._v2s.next = 100;           //设置初始id的值；

