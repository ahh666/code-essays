/*
 * @Description: 思路：当图片滚动至（处在）可视区域内时，再给 img 加上 src 属性
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-01-15 14:24:13
 * @LastEditTime : 2021-12-16 13:44:06
 * @LastEditors  : Archer<ahh666@qq.com>
 * @FilePath     : \code-essays\img-lazyload\index.js
 */

class ImgLazyload {
  constructor() {
    this.imgElements = Array.prototype.slice.call(document.querySelectorAll('img'))
    this.byScroll = this.byScroll.bind(this)
    this.init()
  }
  // 节流
  _throttle(fn, wait = 200) {
    let lastTime = 0
    return () => {
      const now = Date.now()
      if (now - lastTime - wait > 0) {
        fn()
        lastTime = now
      }
    }
  }
  // 使用 IntersectionObserver API
  byIntersectionObserver() {
    const options = {
      // 指定观察元素
      root: document.querySelector('#out'),
    }

    // 此方法 IE 不支持
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          const lazyImg = entry.target
          lazyImg.src = lazyImg.dataset.src
          io.unobserve(lazyImg)
        }
      })
    }, options)
    const lazyImgs = this.getLazyloadImgElements()
    lazyImgs.forEach(el => {
      io.observe(el)
    })
  }
  // 获取需要使用懒加载的图片集合
  getLazyloadImgElements() {
    return this.imgElements.filter(el => {
      return el.hasAttribute('data-src')
    })
  }
  // 使用滚动监听
  byScroll() {
    const lazyImgs = this.getLazyloadImgElements()
    const len = lazyImgs.length
    if (len <= 0) {
      alert('填充结束')
      window.removeEventListener('scroll', this._throttleBind)
      return
    }
    for (let i = 0; i < len; i++) {
      const lazyImg = lazyImgs[i]
      // 当图片顶部与视口顶部的距离小于视口的高度时，填充图片
      if (lazyImg.getBoundingClientRect().top < document.documentElement.clientHeight) {
        lazyImg.src = lazyImg.dataset.src
        lazyImg.removeAttribute('data-src')
      }
    }
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.byIntersectionObserver()
    } else {
      this.byScroll()
      // 使用节流函数
      this._throttleBind = this._throttle(this.byScroll, 200)
      window.addEventListener('scroll', this._throttleBind)
    }
  }
}

new ImgLazyload()
