/*
 * @Description: promise 处理链式结构和穿透
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-23 14:41:54
 * @LastEditTime: 2021-08-31 11:22:41
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\promise\promise.js
 */

/**
 * 1.三种状态
 * 2.then链，两个参数，通过是否是成功状态判断执行
 * 3.catch，一个参数，失败情况下执行
 */
const PEDDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
/**
 * 1.将需要执行的方法放到一个队列中去，当 resolve/reject 后再去依次执行
 */
class MyPromise {
  constructor(executor) {
    this.status = PEDDING
    this.value = undefined
    this.reason = undefined

    // 执行队列
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.status === PEDDING) {
        this.status = FULFILLED
        this.value = value

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = reason => {
      if (this.status === PEDDING) {
        this.status = REJECTED
        this.reason = reason

        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.status === FULFILLED && onFulfilled?.(this.value)
    this.status === REJECTED && onRejected?.(this.reason)

    if (this.status === PEDDING) {
      onFulfilled && this.onFulfilledCallbacks.push(() => onFulfilled(this.value))
      onRejected && this.onFulfilledCallbacks.push(() => onRejected(this.reason))
    }
  }

  catch(onRejected) {
    this.status === REJECTED && onRejected(this.reason)
  }
}

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

new MyPromise(resolve => {
  console.log(222)
  asyncFn(() => {
    resolve('success')
  })
}).then(res => {
  console.log('成功：' + res)
}).then(res => {
  console.log('成功1：' + res)
})
