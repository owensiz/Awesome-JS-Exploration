/*
 * @Description: 扩展运算符 
 对象：1 浅拷贝（obj中的自有属性中的可枚举属性）2 解构赋值
 数组：1 浅拷贝， 2 解构赋值， 3 将函数参数变成数组
 * @Refer: https://www.yuque.com/fe9/basic/upk879
 * @Author: owensiz
 * @Date: 2019-10-10 14:08:18
 */

// ----------- 对象 -----------
// --------1浅拷贝
var obj = { name: 'he', age: 3, gender: 'female' }
var anotherObj = { grade: 1 }
var obj1 = { ...obj }
var anotherObj1 = { ...obj, ...anotherObj }
// 相当于Object.assign()
var obj2 = Object.assign(obj)
var anotherObj2 = Object.assign(obj, anotherObj)
console.log(obj1, obj2, anotherObj1, anotherObj2)
// --------2解构赋值
// 此处要加关键字var/const之类
// 根据键值匹配，不是同数组只能取最后几位
var { age, ...obj3 } = obj
console.log(obj3)
// 重命名
var { age: yearsOld } = obj
console.log(yearsOld)

// ----------- 数组 -----------
// --------1浅拷贝
var arr = [1, 2, 3]
var arr1 = [...arr]
console.log(arr1)
// --------2解构赋值
;[a, ...rest] = arr
console.log(rest)
// --------3 将函数参数变成数组
// 反向操作
function toArr(...arr) {
  console.log(arr)
}
toArr(1, 2, 3)
