/**
 * 抽象方法
 */
function abstractMethod() {
      throw new Error('abstract method');
}

/**
 * 返回函数的名字，不是函数的话返回null
 * @returns
 */
Function.prototype.getName = function() {
    if("name" in this) return this.name;
    return this.name = this.toString().match(/ function\s*([^(]*)\(/)[1];
};

/**
 * 创建一个子类
 * @param constructor 子类的构造函数
 * @param methods 实例方法，复制到原型中
 * @param statics 类属性，复制到构造函数中
 * @returns
 
Function.prototype.extend = function(constructor, methods, statics) {
	return defineSubclass(this, constructor, methods, statics);
};*/
Function.prototype.extend = function(prop) {
	return jClass(this,prop);
};

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

/**
 * 返回对象的类型
 */
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
};

/**
 * 使用原型创建对象 
 * @param p 原型对象
 * @returns
 */
function inherit(p) {
    if(p == null) throw TypeError();        //p不能是null
    if(Object.create)                               //如果Object.create存在
        return Object.create(p);
    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){};                                   //定义一个空的构造函数
    f.prototype = p;                              //将其原型属性设置为p
    return new f();                                //使用发f()创建p的继承对象
}

/**
 * 把p中的可枚举属性复制到o中，并返回o；
 * 如果o和p中含有同名属性，则覆盖o中的属性
 * 这个函数并不处理getter和setter以及复制属性
 * @param o
 * @param p
 * @returns o
 */
function extend(o, p) {
	for(var prop in p){
		o[prop] = p[prop];
	}
	return o;
}

/**
 * 将p中的可枚举属性复制到o中，并返回o
 * 如果o和p中有同名的属性，o中的属性将不受影响
 * 这个函数并不处理getter和setter以及复制属性
 * @param o
 * @param p
 * @returns o
 */
function merge(o, p) {
	for(var prop in p){
		if(o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
	}
	return o;
}

/**
 * 创建子类
 * 这种方式与借用方法不同，它是动态地从父类继承方法，当父类的原型添加新方法时，
 * 子类也会立即拥有这个方法
 * @param superclass 父类的构造函数
 * @param constructor 新的子类的构造函数
 * @param methods 实例方法：复制到原型中
 * @param statics 类属性：复制到构造函数中
 */
function defineSubclass(superclass,constructor,methods,statics) {
	
	//建立子类的原型对象
	constructor.prototype = inherit(superclass.prototype);
	constructor.prototype.constructor = constructor;
	
	//像对常规类一样复制方法和类属性
	if(methods) extend(constructor.prototype, methods);
	if(statics) extend(constructor, statics);
	
	//返回这个类
	return constructor;
}

