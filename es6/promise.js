/*
 * @Description: 手写一个promise
 * @Refer: https://juejin.im/post/5b2f02cd5188252b937548ab
 * 规范：https://promisesaplus.com/
 * @Author: owensiz
 * @Date: 2019-10-15 14:08:48
 */
// ---------- 版本1.0 声明和then方法：解决基本同步使用
//  首先promise一定是一个类，使用class
class Promise {
  // 由于new Promise((resolve,reject)=>{})，所以要传入一个函数executor作为参数
  constructor(executor) {
    // 知道promise具有不可变性。三个状态为pending，fulfilled，rejected，第一个为初始态，后两者为终态。
    // new Promise((resolve, reject) => {resolve(value)}) resolve为成功，接受参数value，状态变为fulfilled，并凝固。
    // new Promise((resolve, reject) => {reject(reason)}) reject为失败，接受参数reason，状态变为rejected，并凝固。
    // 初始态
    this.state = 'pending'
    // 成功返回值
    this.value = undefined
    // 失败返回值
    this.reason = undefined
    // 成功bc
    let resolve = value => {
      // state如果改变，resolve调用就会失败
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }
    // 失败bc
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
      }
    }
    // 立即执行
    try {
      executor(resolve, reject)
      // 如果executor执行报错，直接执行reject
    } catch (error) {
      reject(error)
    }
  }
  // then方法
  // then方法的两个参数：onFulfilled,onRejected（可选）。分别是resolved状态的回调函数，rejected状态的回调函数。
  // 根据状态是什么来判断传入什么参数以及执行什么函数。
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
  }
}

// ---------- 版本2.0
// 解决异步实现
// 现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态。
// 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们

class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    // 类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。
    // 存放成功cb的数组
    this.onResolvedCallbacks = []
    // 存放失败cb的数组
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        // 当resolve执行时，依次调用成功cb数组的函数
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        // 当reject执行时，依次调用失败cb数组的函数
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
    // 当状态为pending时，即上述异步场景的诉求
    if (this.state === 'pending') {
      // 将onFulfilled放到成功cb数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

// 版本3.0
// 解决链式调用
// 1、为了达成链式，我们默认在第一个then里返回一个promise。
// 秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})
// 将这个promise2返回的值传递到下一个then中。如果返回一个普通的值，则将普通的值传递给下一个then中

// 2、当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值
// 秘籍则规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise

// 3、首先，要看x是不是promise。
// 如果是promise，则取它的结果，作为新的promise2成功的结果
// 如果是普通值，直接作为promise2成功的结果
// 所以要比较x和promise2，使用resolvePromise来描述怎么从x得出promise2。
// resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象。是第一个then返回的，是onFulfilled()或onRejected()的值）、
// 以及promise2的resolve、reject。

// 【FOCUS!!】promise2 = promise1.then(onFulfilled, onRejected);

class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 声明第一个then返回的promise2
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value)
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    // 返回promise2，完成链式
    return promise2
  }
}
// 完成resolvePromise函数
// resolvePromise,让不同的promise相互套用。处理自己return的promise（也就是x）和默认的promise2的关系
function resolvePromise(promise2, x, resolve, reject) {
  // 不能自己调用自己，不能循环调用
  if (promise2 === x) {
    return reject(new TypeError('chaining cycle deteced for promise'))
  }
  // 1、判断x
  // x 不能是null
  // x 是普通值 直接resolve(x)
  // x 是对象或者函数（包括promise），let then = x.then（Otherwise, if x is an object or function,Let then be x.then）
  // 2、当x是对象或者函数（默认promise）
  // 声明了then
  // 如果取then报错，则走reject()
  // 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
  // 如果成功的回调还是pormise，就递归继续解析
  // 3、成功和失败只能调用一个 所以设定一个called来防止多次调用

  let called // 设置一个called防止多次调用 ？？?这个俺也不是很明白
  // 判断x
  // 如果x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 声明then，为x的then
      // A+规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise
      let then = x.then
      // 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
      if (typeof then === 'function') {
        // then.call在这里
        then.call(
          x,
          res => {
            if (called) return
            called = true
            // 啊，这里使用了递归啊
            // 如果成功的回调还是promise，就递归继续解析
            resolvePromise(promise2, res, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            // 递归结束条件1
            reject(err)
          }
        )
      } else {
        // 如果x为obj。
        resolve(x)
        // 不应该是resolve(then)。不是的哦。就是直接传进去的。http://es6.ruanyifeng.com/#docs/promise#Promise-prototype-then
      }
    } catch (error) {
      // 如果取then报错，reject
      if (called) return
      called = true
      // 也是失败，仍属于递归结束条件1
      reject(err)
    }
  } else {
    // 如果x是普通值，直接resolve(x)
    // 递归结束条件2
    resolve(x)
  }
}

// 版本4.0
// 解决其他问题
// then方法的参数必须是函数，且必须被异步调用
// 1、秘籍规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略
// onFulfilled返回一个普通的值，成功时直接等于 value => value
// onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
// 2、秘籍规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
// 如果onFulfilled或onRejected报错，则直接返回reject()

class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected必须是函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err
          }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // onFulfilled, onRejected必须是异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('chaining cycle deteced for promise'))
  }

  let called

  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          res => {
            if (called) return
            called = true
            resolvePromise(promise2, res, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

// 作者的完整代码 https://juejin.im/post/5b2f02cd5188252b937548ab?spm=a2c4e.10696291.0.0.404719a4CmjJTo#heading-6
class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err
          }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch(fn) {
    return this.then(null, fn)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  let called
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
//resolve方法
Promise.resolve = function(val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}
//reject方法
Promise.reject = function(val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}
//race方法
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises) {
  let arr = []
  let i = 0
  function processData(index, data) {
    arr[index] = data
    i++
    if (i == promises.length) {
      resolve(arr)
    }
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        processData(i, data)
      }, reject)
    }
  })
}
