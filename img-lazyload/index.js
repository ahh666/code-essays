/*
 * @Description: 思路：当图片滚动至（处在）可视区域内时，再给 img 加上 src 属性
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-01-15 14:24:13
 * @LastEditTime: 2021-01-15 14:29:46
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\img-lazyload\index.js
 */

const imgElements = document.querySelectorAll('.lazy-img')
// 此方法 IE 不支持
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry=> {
    if (entry.intersectionRatio > 0) {
      const lazyImg = entry.target
      lazyImg.src = lazyImg.dataset.src
      io.unobserve(lazyImg)
    }
  })
})
imgElements.forEach(el=> {
  io.observe(el)
})

