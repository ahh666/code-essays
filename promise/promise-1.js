/*
 * @Description: promise 基本思路（不处理异步）
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-23 14:41:54
 * @LastEditTime: 2021-08-30 16:30:26
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\promise\promise-1.js
 */

/**
 * 1.三种状态
 * 2.then链，两个参数，通过是否是成功状态判断执行
 * 3.catch，一个参数，失败情况下执行
 */
const PEDDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PEDDING
    this.value = undefined
    this.reason = undefined

    const resolve = value => {
      if (this.status === PEDDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject = reason => {
      if (this.status === PEDDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.status === FULFILLED && onFulfilled(this.value)
    this.status === REJECTED && onRejected(this.reason)
  }

  catch(onRejected) {
    this.status === REJECTED && onRejected(this.reason)
  }
}

new MyPromise(resolve => {
  resolve('success')
}).then(res => {
  console.log('成功：' + res)
})

// =========== 异步场景 ============

/**
 * 模拟异步情况，假定cb一定传一个函数
 */
const asyncFn = cb => {
  const el = document.createElement('div')
  const obsever = new MutationObserver(cb)
  obsever.observe(el, { attributes: true })
  el.setAttribute('key', '1')
  el.remove()
}

/**
 * 此时只会打印222，因为执行 .then 时，异步中的resolve并没有执行
 * 接下来就要这种情况，写在 promise.js
 */
new MyPromise(resolve => {
  console.log(222)
  asyncFn(() => {
    resolve('success')
  })
}).then(res => {
  console.log('成功：' + res)
})
