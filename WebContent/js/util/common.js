//返回函数的名字，不是函数的话返回null
Function.prototype.getName = function() {
    if("name" in this) return this.name;
    return this.name = this.toString().match(/ function\s*([^(]*)\(/)[1];
};