// ---------------------------------------------改变数组自身了吗ヾ(◍°∇°◍)ﾉﾞ--------------------------------------------------------------------------
// ✅改变数组的内部内容 ---- push,pop,unshift,shift,splice,concat, slice
// ε＝ε＝ε＝(#>д<)ﾉ 这边注意一下返回值噢！！
const arr = [1, 2, 3, 4, 100]

const arrPushReturn = arr.push(999)
console.log(arrPushReturn, arr) // 6   (6) [1, 2, 3, 4, 100, 999]返回新的长度

const arrPopReturn = arr.pop()
console.log(arrPopReturn, arr) // 999     (5) [1, 2, 3, 4, 100] 返回删除的值

const arrUnshiftReturn = arr.unshift(888)
console.log(arrUnshiftReturn, arr) //6    (6) [888, 1, 2, 3, 4, 100]返回新的长度

const arrShiftReturn = arr.shift()
console.log(arrShiftReturn, arr) // 888     (5) [1, 2, 3, 4, 100] 返回删除的值

const arr = [1, 2, 3, 4, 100]
// splice的三个/n个参数 ：startIndex，deleteNum，item1，item2...
const arrSpliceReturnDEL = arr.splice(2, 1)
console.log(arrSpliceReturnDEL, arr) //[3]    (4) [1, 2, 4, 100]
const arrSpliceReturnADD = arr.splice(2, null, 777)
console.log(arrSpliceReturnADD, arr) // []      (5) [1, 2, 777, 4, 100]
const arrSpliceReturnREPLACE = arr.splice(2, 1, 666)
console.log(arrSpliceReturnREPLACE, arr) //[777]       (5) [1, 2, 666, 4, 100]

// ✅数组的一些查找和判断 ---- includes, indexOf, lastIndexOf, some, every, find, filter
const arr = [1, 233, 3, 4, 100]
// 对象数组不能使用includes方法来检测。参数形式为 valueToFind，fromIndex
const bolIncludes = arr.includes(233) // true
const bolIncludes1 = arr.includes(233, 3) //false
console.log(bolIncludes, bolIncludes1)

// 参数形式同上，还有lastIndexOf
const returnIndexOf = arr.indexOf(233) // 1 第二个
const returnIndexOf1 = arr.indexOf(233, 3) // -1
console.log(returnIndexOf, returnIndexOf1)

const arr = [1, 233, 3, 4, 100]
// some和every的callback的参数形式为item, index, arr
const bolSome = arr.some((item, index, arr) => {
  return item > 100
}) // true
const bolEvery = arr.every((item, index, arr) => {
  return item > 100
}) //false

// find的参数是一个callback，而callback的参数形式为item, index, arr。返回值为第一个符合条件的值，没有就返回undefined
const arr = [1, 233, 3, 4, 100]
const returnFind = arr.find((item, index, arr) => {
  return item > 2
}) //233
const returnFind1 = arr.find((item, index, arr) => {
  return item > 2000
}) //undefined

// filter参数形式同find，但是返回值不同，返回的是一个数组
const returnFilter = arr.filter((item, index, arr) => {
  return item > 2
}) //(4) [233, 3, 4, 100]
const returnFilter1 = arr.filter((item, index, arr) => {
  return item > 2000
}) //[]

// concat返回一个新数组，不改变原数组; 浅复制
const arr = [1, 2, 3]
const concatReturn = arr.concat(['困死了', '啊啊啊'])
console.log(
  concatReturn,
  concatReturn === arr ? '改变了原数组' : '不改变原数组'
) // (5) [1, 2, 3, "困死了", "啊啊啊"] "不改变原数组"

// ✅下面解释一下浅复制，哟，shallow copy，୧(๑•̀◡•́๑)૭，一项一项复制的时候，数字和字符串深复制，引用类型浅复制，只是引用指向同一内存地址
const arr1 = [1,2,{a:1}]
const arr2 =[4,5]
const mergeArr = arr1.concat(arr2)
console.log(mergeArr, mergeArr[2].a)
setTimeout(() => {
  arr1[2].a = '我变了'
  console.log(mergeArr,mergeArr[2].a)
}, 1500);

// slice, 不改变原数组，浅复制，浅复制的规则同concat，参数形式为start, end
const arr = [1,2,3,4,{a:1}]
const sliceReturn =  arr.slice(1)
console.log(sliceReturn, sliceReturn[3].a)
setTimeout(() => {
  arr[4].a = '俺好困'
  console.log(sliceReturn[3].a)
}, 1500);

// ✅数组的一些别的功能--杂项   ----reverse, reduce, reduceRight
const arr = [1, 233, 3, 4, 100]
const arrReverse = arr.reverse()
console.log('是否改变原数组',arr===arrReverse) //true

// 碗碗注解：跟map一样，参数是一个callback，是一个reducer累加器，它只返回最终的值，不是遍历一次返回一次
const arr = [1, 2, 3, 4, 100]
// const total = iterable.reduce((previous, current) => {
//   ...
// }, initial)  // 看这个emmet！！！！多么优秀啊！！！！
const total = arr.reduce((previous, current, currentIndex) => {
  return previous + current + 10000 // zz碗碗，下一次没写return的地方，一定一定确认一下是不是写的括号
}, 1000)
console.log(total)

// reduceRight的执行方向相反
const arr =[1,2,3, 100]
const arrReduce = arr.reduce((per,curr)=>(per + curr),1000) //1106
const arrReduceRight = arr.reduceRight((per,curr)=>(per + curr),1000) //1106
console.log(arrReduce,arrReduceRight)

// 用reduce写一个flatten
const arr =[[1,2,3],[4,5],[6]]
const arrReduce = arr.reduce((per,curr)=>(per.concat(curr))) //(6) [1, 2, 3, 4, 5, 6]
const arrReduceRight = arr.reduceRight((per,curr)=>(per.concat(curr))) //(6) [6, 4, 5, 1, 2, 3]
console.log(arrReduce,arrReduceRight)

// ✅数组和字符串的转化 ---join, toString, toLocalString .join如果什么都不传，默认的separator是,
const arr = [1,2,3,{a:99}]
const joinReturn = arr.join('') //123[object Object]
const joinReturn1 = arr.join(',') // 1,2,3,[object Object]
console.log(joinReturn,joinReturn1)

const tostring = arr.toString() // 1,2,3,[object Object] 效果同 join(',')
const tostring1  =arr.toLocaleString() // 1,2,3,[object Object]  特定语言环境的字符串 国际化
console.log(tostring,tostring1)
