var strict = (function(){return !this;}());
console.log('----------------------------------------');
console.log(strict ? 'strict model' : 'Non-strict model');
console.log('----------------------------------------');

var fun1 = require('./t1');
var fun2 = require('./t2');
var Ground = require('../widget/Ground');
var Observable = require('../core/Observable');
//var Observable = fun3.Observable; 


function test(){
     console.log("调用了app的test方法");
     fun1.obj.add(1,2);
     fun2.print();
     var obj = new Ground();
     obj.print();
}
test();