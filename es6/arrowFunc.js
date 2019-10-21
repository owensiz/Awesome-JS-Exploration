/*
 * @Description: 箭头函数 this return
 * @Refer: https://www.yuque.com/fe9/basic/gh081d#24b4af37
 * https://juejin.im/post/5aa1eb056fb9a028b77a66fd
 * @Author: owensiz
 * @Date: 2019-10-10 14:36:17
 */

;() => {
  console.log(this)
}

// 经过babel转译为：
// var self = this
// (function () {
//   console.log(self)
// })

// 故得出，箭头函的定义时上下文和执行时上下文是一致的。箭头函数this为它当前所处作用域下的 this。
// 箭头函数会默认帮我们绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的。

// 多层对象嵌套里箭头函数里this是和最最外层保持一致的。

// 普通函数，多层对象嵌套
const obj = {
  a: function() {
    console.log(this)
  },
  b: {
    c: function() {
      console.log(this)
    },
  },
}
obj.a() // 打出的是obj对象, 相当于obj.a.call(obj)
obj.b.c() //打出的是obj.b对象, 相当于obj.b.c.call(obj.b)

// 箭头函数，多层对象嵌套
const obj = {
  a: () => {
    console.log(this)
  },
  b: {
    c: () => {
      console.log(this)
    },
  },
}

// babel之后
;('use strict')

var _this = void 0

var obj = {
  a: function a() {
    console.log(_this)
  },
  b: {
    c: function c() {
      console.log(_this)
    },
  },
}
