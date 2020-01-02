// - use:
//  a reducer 累加器
const arr = [1, 2, 3, 4];
const reducer = (preVal, currVal) => {
  return preVal + currVal;
}; //记住，不写return的话都是直接用圆括号包起来的
const finalVal = arr.reduce(reducer); // 10
const finalVal1 = arr.reduce(reducer, 5); // 15
console.log(finalVal, finalVal1);

// - syntax:
// const reducer = (acc, cur, idx, src) => {
// }
// arr.reduce(reducer, initial)
// 即 cb函数has 4 params：
// Accumulator (acc)
// Current Value (cur)
// Current Index (idx)
// Source Array (src)

// - keys：

// 1、初始值不传怎么处理
// 2、回调函数的参数有哪些，返回值如何处理。

// - code：
Array.prototype.myReduce = function(fn, initial) {
  debugger;
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  // 是否有initial
  res = initial ? initial : arr[0];
  startIndex = initial ? 0 : 1;
  for (var i = startIndex; i < arr.length; i++) {
    // 4个入参
    // (res,arr[i],i,this)对应着(acc, cur, idx, src)
    res = fn.call(null, res, arr[i], i, this);
  }
  return res;
};
// -------------------------practice01
// Array.prototype.myReduce = function(fn, initial) {
//   // debugger
//   // const arr = Array.prototype.slice(this); ERROR call
//   const arr = Array.prototype.slice.call(this);
//   let res, startIdx;
//   res = initial ? initial : arr[0];
//   startIdx = initial ? 0 : 1;
//   for (let i = startIdx; i < arr.length; i++) {
//     // fn.call(null, res, arr[i], i, arr); ERROR 累加
//     res = fn.call(null, res, arr[i], i, arr);
//   }
//   return res;
// };
// - test:
const arr = [1, 2, 3, 4];
const reducer = (preVal, currVal) => {
  return preVal + currVal;
}; //记住，不写return的话都是直接用圆括号包起来的
const finalVal = arr.myReduce(reducer); // 10
const finalVal1 = arr.myReduce(reducer, 5); // 15
console.log(finalVal, finalVal1);
