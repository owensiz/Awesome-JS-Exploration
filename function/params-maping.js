/*
 * @Description: 函数参数的映射规则
 * @Refer: https://www.yuque.com/fe9/basic/tuv9an
 * @Author: owensiz
 * @Date: 2019-10-10 10:29:01
 */

function sum(a, b) {
  b = 3
  console.log(arguments[0], arguments[1])
}

sum(1) //1 undefined
sum(1, 2) //1 3

// 实参的数目和arguments长度是一致的。 


