/*
 * @Description: async函数使用注意点
  1 注意catch错误： 使用try-catch，使用promise.catch()
  2 使用并行提高运行速度： 使用promise.all()
 * @Refer: reference
 * @Author: owensiz
 * @Date: 2019-10-10 17:20:17
 */

// ------------ 在await外面使用try-catch ------------
const fn = async () => {
  try {
    await Promise.reject(new Error('我出错了'))
  } catch (error) {
    console.log(error)
  }
  console.log('仍可以运行')
}

fn()

// ------------ 使用promise.catch() ------------
const fn1 = async () => {
  await Promise.reject(new Error('我出错了')).catch(err => {
    console.log(err)
  })
  console.log('仍可以运行')
}
fn1()

// ------------ 使用 Promise.all 使串行变并行 ------------

// 串行
const lineFn = async () => {
  const res1 = await request(url1)
  const res2 = await request(url2)
}
// 并行
const parallelFn = async () => {
  const [res1, res2] = await Promise.all([request(url1), request(url2)])
}
