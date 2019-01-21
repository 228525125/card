// 当前是否处于创建类的阶段

var initializing = false;

/**
 * 创建一个类；
 * 该类调用init方法进行实例的初始化，即init等同于构造函数；
 * 实例中包含了对父类的引用，即this.superclass；
 * 所有方法都包含对父类方法的引用，即this.superFunction；
 * 缺陷，无法用构造函数来区分实例的类，因为所有实例的构造函数都指向F；
 * @param baseClass
 * @param prop
 * @returns {F}
 */
function jClass(baseClass, prop) {

	// 只接受一个参数的情况 - jClass(prop)
	
	if (typeof (baseClass) === "object") {
	
		prop = baseClass;
		
		baseClass = null;
	
	}

	// 创建一个新类，并保存父类的引用，以便于实例对象调用父类方法
	
	// 本次调用所创建的类（构造函数）
	
	function F() {
	
		// 如果当前处于实例化类的阶段，则调用init原型函数
		
		if (!initializing) {
		
			// 如果父类存在，则实例对象的baseprototype指向父类的原型
		
			// 这就提供了在实例对象中调用父类方法的途径
		
			if (baseClass) {
			
				this.superclass = baseClass.prototype;
			
			}
			
			this.init.apply(this, arguments);
		
		}
	
	}

	// 实现继承，新的类（F）的原型是基类baseClass的实例，即本方法返回的类，继承了baseClass；
	
	// 如果此类需要从其它类扩展
	
	if (baseClass) {
	
		initializing = true;
		
		F.prototype = new baseClass();        //等同于 F.prototype = inherit(baseClass.prototype);
		
		F.prototype.constructor = F;
		
		initializing = false;
	
	}
	
	// 覆盖父类的同名函数，同时将同名的父类方法保存起来，以便于调用
	
	for (var name in prop) {
	
		if (prop.hasOwnProperty(name)) {
		
			// 如果此类继承自父类baseClass并且父类原型中存在同名函数name
			
			if (baseClass &&
			
			typeof (prop[name]) === "function" &&
			
			typeof (F.prototype[name]) === "function") {
			
			
			
				// 重定义函数name - 
				
				// 首先在函数上下文设置this.superFunction指向父类原型中的同名函数
				
				// 然后调用函数prop[name]，返回函数结果
				
				
				
				// 注意：这里的自执行函数创建了一个上下文，这个上下文返回另一个函数，
				
				// 此函数中可以应用此上下文中的变量，这就是闭包（Closure）。
				
				// 这是JavaScript框架开发中常用的技巧。
				
				// 分析，()内创建了一个匿名函数，他的作用域延伸自外部函数jClass，因此他可以使用baseClass等变量
				// 又由于返回的是函数，即形成闭包，该函数对象赋值给F的原型，因此是作为方法调用，根据函数调用的规
				// 则，this指向调用它的对象，综上所述，这个技巧既使用了外部函数上下文中的变量，又实现了实例对象
				// 的方法调用；
				
				F.prototype[name] = (function(name, fn) {
				
					return function() {
					
						this.superFunction = baseClass.prototype[name];
						
						return fn.apply(this, arguments);
					
					};
				
				})(name, prop[name]);
			
			} else {
			
				F.prototype[name] = prop[name];
			
			}
		
		}
	
	}
	
	return F;

};