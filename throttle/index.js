/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-02 09:45:58
 * @LastEditTime: 2021-08-02 10:34:19
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\throttle\index.js
 */


/**
 * @description: 节流，立即执行方法，之后触发周期不超过 wait 不执行
 * @param {*} fn
 * @param {*} wait
 * @return {*}
 */
function throttle(fn, wait = 300) {
  let timer = null
  return function () {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
      }, wait)
      fn.apply(context, arguments)
    }
    
  }
}
