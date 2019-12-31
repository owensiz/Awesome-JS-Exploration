/*
 * @Description: 数组的map
 * @Refer: reference
 * @Author: owensiz
 * @Date: 2019-12-26 20:44:30
 */

 
//  - syntax:
// var new_array = arr.map(function callback(currentValue[, index[, array]]) {
//   // Return element for new_array
// }[, thisArg])



// - points:
// 1.回调函数的参数有哪些，返回值如何处理。
// 2.不修改原来的数组



// - code：
// 注意map有两个参数，一个为cb，一个为执行上下文this
Array.prototype.myMap = function(fn, context) {
  // debugger
  // this为调用map方法的数组。copy一个数组，避免修改原数组。
  var arr = Array.prototype.slice.call(this); //效果类似于 const arr = [...this];
  var mappedArr = [];
  for (var i = 0; i < arr.length; i++) {
    // 传入的回调函数fn的参数为item,index,arr本身
    mappedArr.push(fn.call(context, arr[i], i, this));
  }
  return mappedArr;
};


const arr = [1, 2, 3];
const arr1 = arr.map((item, index) => {
  return item + index
})
const arr2 = arr.myMap((item, index) => {
  return item + index
});



