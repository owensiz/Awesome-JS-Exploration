/*
 * @Description: js数据类型  需要补充判断类型的函数
 * @Refer: https://juejin.im/post/5cec1bcff265da1b8f1aa08f
 * @Author: owensiz
 * @Date: 2019-10-17 15:01:03
 */
// -------------- js类型分类
// 1 js数据类型：基本类型6+复杂类型1
// 2 基本：null undefined number boolean string symbol
// 虽然typeof null == 'object'为true，但是null为基本类型
// 3 复杂：object
// 存储：基本类型存在栈内存中，复杂数据类型的地址在栈内存中，值存在堆内存中。

// -------------- typeof
// 可以判断除了null之外的基本类型，可以判断复杂类型中的function
typeof null == 'object' //true
typeof 12 //"number"
typeof 'owen' //"string"
typeof true //"boolean"
typeof undefined //"undefined"
typeof null //"object"
typeof function() {} //"function"

// typeof ()=>{}
// VM815:1 Uncaught SyntaxError: Malformed arrow function parameter list

// -------------- instanceof
// 原理是原型链判断
// // instanceof可以用来判断复杂类型，但不能判断简单类型
[] instanceof Array // true
[] instanceof Object // true
new Date() instanceof Date //true
new RegExp() instanceof RegExp //true
'owen' instanceof String //false

// -------------- toString
// 每一个引用类型都有toString方法，默认情况下，toString()方法被每个Object对象继承。
// 如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象的类型。
// 但事实上，大部分引用类型比如Array、Date、RegExp等都重写了toString方法。
// 可以直接调用Object原型上未被覆盖的toString()方法，使用call来改变this指向来达到我们想要的效果。
function judgeType(obj){
  return Object.prototype.toString.call(obj)
}

judgeType('123')
judgeType(123)
judgeType(true)
judgeType({a:1})
judgeType([1])




