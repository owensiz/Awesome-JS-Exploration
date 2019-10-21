// js是基于原型的。class关键字只是语法糖。
// 每一个实例对象都有一个私有属性__proto__或者称[[prototype]]，指向它的构函的原型对象（prototype。Object.prototype 属性表示 Object 的原型对象。）。这个对象也有自己的原型对象，一层层向上，直到null。
// js对象有一个指向原型对象的链。
// 从es6开始，__proto__也就是[[prototype]]可以通过 Object.getPrototypeOf() 和 Object.setPrototypeOf()来访问。
// 但是，__proto__也就是[[prototype]]不应该和构函的prototype属性相混淆。构函创造的实例对象的__proto__也就是[[prototype]]属性（对象）指向构函的prototype属性（对象）。
// cat.__proto__ === Cat.prototype
// Cat.prototype.constructor === Cat
// Cat.prototype.__ptoto__ === Object.prototype
// ---------- dmeo1 ----------
function Cat() {
  this.name = 'nei'
}
const catnei = new Cat()
console.log(
  'catnei.name',
  catnei.name,
  'Object.getPrototypeOf(catnei),',
  Object.getPrototypeOf(catnei),
  'catnei.__proto__',
  catnei.__proto__,
  'catnei.__proto__',
  catnei.__proto__,
  'Cat.prototype===catnei.__proto__',
  Cat.prototype === catnei.__proto__
)
// ---------- dmeo2 ----------
function F() {
  this.a = 1
  this.b = 2
}
const f = new F()
F.prototype.b = 3
F.prototype.c = 4
console.log('f.a', f.a, 'f.b', f.b, 'f.c', f.c, 'f.d', f.d) // 1 2 4 undefined
// 形成的原型链： {a:1, b:2} ---> {b:3, c:4} ---> Object.prototype---> null
// 在 __proto__ 的整个原型链被查看之后，这里没有更多的 __proto__ ， 浏览器断言该属性不存在，并给出属性值为 undefined 的结论。

// 方法的继承
// js中无“方法”这种单独的概念。对象添加属性与对象添加方法无异。方法的继承与属性的继承无异。包括属性遮蔽。
// 当继承的函数被调用时，this指向当前继承的对象，而非继承的函数所在原型对象。
// ---------- dmeo3 ----------
const O = {
  a: 1,
  f: function() {
    return this.a * 2
  },
}

const o1 = Object.create(O)
o1.a = 2
console.log('O.f()', O.f(), 'o1.f()', o1.f()) // 2 4

// 使用原型
const Ow = function() {}
Ow.prototype.bar = 'BAR'
const ow = new Ow()
ow.fox = 'OWENSIZ'
console.log(ow)

/*   
Ow {fox: "OWENSIZ"}
  fox: "OWENSIZ"
  __proto__:
    bar: "BAR"
    constructor: ƒ ()
      arguments: null
      caller: null
      length: 0
      name: "Ow"
      prototype: {bar: "BAR", constructor: ƒ}
    __proto__: ƒ ()
      [[FunctionLocation]]: VM1111:1
      [[Scopes]]: Scopes[2]
      __proto__: Object 
*/

// 使用不同方法来创造对象
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// ----------1. 使用语法结构创造的对象----------
var arr = [1, 2]
var obj = { a: 1 }
var fn = function() {}
//---------- 2. 使用构造器。构函其实只是普通函数，只有当使用new操作符来操作这个函数，这个函数就变成了构造函数----------
function Graph() {
  this.axis = []
  this.points = []
}
Graph.prototype.paintPodints = function(p) {
  this.points.push(p)
}
const g = new Graph()
// 3. 使用 Object.create(a1)生成新对象，其中传入的参数就是新对象的原型对象[[prototype]]。
const a1 = {
  pill: 'PILL',
}
const a2 = Object.create(a1)
console.log(a2.__proto__ === a1)
// a2 ---> a1 ---> Object.prototype ---> null
// ----------3. 使用class关键字创造的对象----------
// 这些新的关键字包括 class, constructor，static，extends 和 super。
// 官网例子，正方形继承矩形
class Polygon {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}
class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength)
  }
  get area() {
    return this.width * this.height
  }
  set newSideLength(newSideLen) {
    this.width = newSideLen
    this.height = newSideLen
  }
}
const square = new Square(2)
console.log(square.area) // 4
square.newSideLength = 4
console.log(square.area) // 16

// 性能
// 在原型链上查找属性比较耗时，对性能有副作用。若试图访问不存在的属性会遍历整个原型链。
// hasOwnProperty 是 JavaScript 中唯一一个处理属性并且不会遍历原型链的方法。（译者注：原文如此。另一种这样的方法：Object.keys()）
// 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。
const s = { name: 'S', age: null }
console.log(s.hasOwnProperty('age')) // true
console.log(s.hasOwnProperty('age1')) // false


// 错误实践：扩展原生对象的原型
// 扩展内置原型的唯一理由是支持 JavaScript 引擎的新特性，如 Array.forEach。