/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-02 10:55:38
 * @LastEditTime: 2021-08-02 13:53:00
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\throttle\index2.js
 */

/**
 * @description: 节流，立即执行，根据参数判断是否执行最后一次动作
 * @param {*} fn
 * @param {*} wait
 * @param {*} trailing 用来决定是否执行最后一次未达到一个时间周期的动作，默认不执行
 * @return {*}
 */
function throttle(fn, wait = 300, trailing = false) {
  let timer = null
  let last = 0

  function throttled() {
    const context = this
    let now = Date.now()
    if (now - last > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(context, arguments)
      last = now
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(context, arguments)
      }, wait)
    }
  }
  return throttled
}
