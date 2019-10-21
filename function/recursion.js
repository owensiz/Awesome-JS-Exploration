/*
 * @Description: 递归recursion 阶乘
 * @Refer: reference
 * @Author: owensiz
 * @Date: 2019-10-10 10:57:51
 */

// 写一个阶乘函数 factorial
// 递归的要点在于，规律本身和结束条件。优点在于代码简洁。
function factorial(n) {
  if (n == 1) {
    return 1
  }
  return n * factorial(n - 1)
}
