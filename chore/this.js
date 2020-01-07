/*
 * @Description: this的使用：包括以下7条：
    1 this 指向全局对象的情况；
    2 严格模式和非严格模式下 this 的区别；
    3 函数作为对象的方法调用时 this 指向的几种情况； ****************** 
    4 作为构造函数时 this 的指向，以及是否 return 的区别；
    5 使用 call 和 apply 改变调用函数的对象；
    6 bind 创建的函数中 this 的指向；
    7 箭头函数中的 this 指向。
 * @Refer: https://www.yuque.com/fe9/basic/utskuy
 * @Author: owensiz
 * @Date: 2019-10-14 09:59:36
 */

// ------------ 1 指向全局对象的情况；
// 若this在全局环境下被调用：非严格模式下，this指向全局对象window；严格模式下，将会是undefined
var a = 1
function testGlobalThis() {
  console.log(this)
}
testGlobalThis() //window

// ------------
;('use strict')
var a = 1
function testGlobalThis() {
  console.log(this)
}
testGlobalThis() //undefined

// ------------ 2 函数作为对象的方法调用时 this 指向的几种情况； ****************** 
// 若作为对象的方法调用，this指向该对象。若将函数赋给某个变量且并未立即执行，此时的this需要根据函数执行所在环境对象判断。
var a = 1
var obj = {
  a: 2,
  testObjThis: function() {
    console.log(this.a)
  },
}
obj.testObjThis() //2

var c = obj.testObjThis
c() //1

// 对象嵌套时，this会指向直接调用函数的上一级对象 *********
// 函数嵌套时，其this值在非严格模式下指向全局对象，在严格模式下是undefined *********
// ------------对象嵌套,nest嵌套
var a = 1
var nestedObj = {
  a: 2,
  b: {
    a: 3,
    testThis: function() {
      console.log(this.a)
    },
  },
}
nestedObj.b.testThis() //3
// ------------函数嵌套
var a = {
  nestedFunc: function() {
    console.log(this === a)
    function getA() {
      console.log(this === a)
      console.log(this)
    }
    getA()
  },
}
// 注意这个写法
a.nestedFunc()
// true
// false
// Window

// ------------ 3 作为构造函数时 this 的指向，以及是否 return 的区别；
// 使用构函new一个实例对象时，this会指向该实例对象；若构函返回一个引用类型Object，this指向该返回值；若构函返回值为一个非引用类型，this仍指向该实例对象
function Fn1() {
  this.a = 1
}
var fn1 = new Fn1()
console.log(fn1.a) // 1
// ------------
function Fn2() {
  this.a = 2
  return {
    a: 3,
  }
}
var fn2 = new Fn2()
console.log(fn2.a) //3
// ------------
function Fn3() {
  this.a = 4
  return 5
}
var fn3 = new Fn3()
console.log(fn3.a) //4

// ------------ 4 使用 call 和 apply 改变调用函数的对象；
// 第一个参数是指定的this，之后的参数call为一个参数列表，apply为一个参数数组。
// 如果第一个参数不传或者传 null 、undefined，默认 this 指向全局对象（非严格模式）或 undefined（严格模式）。
// 如果给call和apply的传参不是Object，会进行隐式类型转换。字符串和数字会变成Number和String类型。
var a = 0
function testChangeThis() {
  console.log(this.a)
}
var obj1 = {
  a: 1,
}
var obj2 = {
  a: 2,
}
testChangeThis() //0
testChangeThis.call(null) //0
testChangeThis.apply(undefined) //0
testChangeThis.call(obj1) //1
testChangeThis.call(obj2) //2

// ------------
function testThis() {
  console.log(this)
  console.log(Object.prototype.toString.apply(this))
}
testThis.call(123) //Number {123} ,[object Number]
testThis.apply('hello') //String {"hello"}, [object String]

// ------------ 5 bind 创建的函数中 this 的指向；
// 朋友，注意一下bind的用法，返回一个新函数
// bind()方法创建一个新的函数，而不是立即执行。新函数的 this 会永久的指向 bind 传入的第一个参数。注意是「永久」
function testThis() {
  console.log(this)
}
var newTestThis = testThis.bind({ a: 1 })
newTestThis() //{a: 1}
newTestThis.apply({ b: 1 }) //{a: 1}

// ------------ 6 箭头函数中的 this 指向。
// 箭头函数会从作用域链的上一层继承 this。详见函数嵌套的例子。在前面普通函数嵌套函数的例子中，被嵌套的函数不会继承上层函数的 this
// 多层对象嵌套时，看
// 和bind一样，不可用call和apply来改变this指向
var a = {
  nestedFunc: function() {
    console.log(this === a) // 普通函数，this指向a
    const getA = () => {
      console.log(this === a) //箭头函数，从作用域链的上一层继承this
      console.log(this)
    }
    getA()
  },
}
a.nestedFunc() //  a a

// -----------
var a = 1
var nestedObj = {
  a: 2,
  b: {
    a: 3,
    testThis: function() {
      const s = () => {
        console.log(this.a)
      }
      return s()
    },
  },
}
nestedObj.b.testThis() //3
var aaa = nestedObj.b.testThis
aaa() //1
// -----------
var a = 1
var nestedObj = {
  a: 2,
  b: {
    a: 3,
    testThis: () => {
      console.log(this.a)
    },
  },
}
nestedObj.b.testThis() //1
var aaa = nestedObj.b.testThis
aaa() //1



function School() {
  var person = {
    getName: function() {
      return () => {
        console.log(this)
      }
    },
    getAge: () => {
      console.log(this)
    }
  }
  var getBestPerson = () => {
    console.log(this)
  }
  getBestPerson()//School
  person.getAge()//School
  person.getName()()//School
}

China = {
    name: 'china'
}

China.getSchool = School

China.getSchool()//China
School()