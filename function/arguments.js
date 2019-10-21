/*
 * @Description: 不定参数arguments，或称可变参，接受任意数量的参数
 * @Refer: https://www.yuque.com/fe9/basic/tuv9an
 * @Author: owensiz
 * @Date: 2019-10-10 10:10:58
 */

var result = 0
function sum() {
  // QUESTION: 箭头函不能使用arguments？
  for (let i = 0; i < arguments.length; ) {
    result += arguments[i]
    i++
  }
  return result
}

sum(1, 2, 3)
