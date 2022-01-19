/*
 * @Author       : Archer<ahh666@qq.com>
 * @Date         : 2022-01-07 14:22:42
 * @LastEditors  : Archer<ahh666@qq.com>
 * @LastEditTime : 2022-01-19 15:34:55
 * @FilePath     : \starry-sky\index.js
 * @Description  : 闪烁星空
 */

// ========== utils ============
// 获取随机数
const random = (min, max) => {
  let _max = max
  let _min = min

  if (!max) {
    _max = min
    _min = 0
  }

  if (max < min) {
    _max = min
    _min = max
  }

  return Math.floor(Math.random() * (_max - _min + 1)) + _min
}

// 随机获取一次颜色
const getActionColor = colors => {
  const randomindex = random(0, colors.length - 1)
  return colors[randomindex]
}

// 获取星星转动轨道最大半径
const maxOrbit = (x, y) => {
  const max = Math.max(x, y)
  // 要包括四个角
  const diameter = Math.round(Math.sqrt(max * max * 2))
  return diameter / 2
}

// ============ canvas ===============

// ----------- 初始化可配置的参数 -------------
const starMaxNum = 1800
// 星星可以切换的颜色列表
const starColorList = [
  { r: 90, g: 0, b: 0 },
  { r: 0, g: 200, b: 0 },
  { r: 0, g: 200, b: 200 },
  { r: 200, g: 0, b: 200 },
]
// 初始化颜色
let currentColor = {
  r: 55,
  g: 73,
  b: 136,
}
// ----------------------------------------

// 星空画布
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let globalWidth = (canvas.width = window.innerWidth)
let globalHeight = (canvas.height = window.innerHeight)

// 创建星星画布
const starCanvas = document.createElement('canvas')

// 星星实例
class Star {
  constructor(starCanvas, currentColor) {
    this.canvas = starCanvas
    this.ctx = starCanvas.getContext('2d')
    this.activeColor = currentColor
  }
  draw(color) {
    const { r, g, b } = color
    let size = globalWidth / 10 > 100 ? globalWidth / 10 : 100

    this.canvas.width = size
    this.canvas.height = size
    const half = this.canvas.width / 2
    // 渐变效果
    const gradient = this.ctx.createRadialGradient(half, half, 0, half, half, half) //中心渐变
    gradient.addColorStop(0.02, '#fff')
    gradient.addColorStop(0.1, `rgba(${r},${g},${b},0.9)`)
    gradient.addColorStop(0.2, `rgba(${r},${g},${b},0.05)`)
    gradient.addColorStop(1, 'transparent')

    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.arc(half, half, half, 0, Math.PI * 2)
    this.ctx.fill()
  }
  // 切换时星星颜色的过渡
  colorTransition(targetColor, level = 30) {
    const { r: ar, g: ag, b: ab } = this.activeColor
    const { r: tr, g: tg, b: tb } = targetColor
    const r = (tr - ar) / level
    const g = (tg - ag) / level
    const b = (tb - ab) / level
    console.log(r, g, b)

    for (let i = 1; i <= level; i++) {
      const colorstep = {
        r: Math.floor(tr + r * i),
        g: Math.floor(tg + g * i),
        b: Math.floor(tb + b * i),
      }
      setTimeout(() => {
        this.draw(colorstep)
      }, i * (1000 / level))
    }
    this.activeColor = targetColor
  }
}

// 对星星做处理
class StarHandler {
  constructor(ctx) {
    this.ctx = ctx
    this.orbitRadius = random(maxOrbit(globalWidth, globalHeight)) //星星运动轨迹旋转半径
    this.radius = random(60, this.orbitRadius) / 12 //星星半径
    this.orbitX = globalWidth / 2
    this.orbitY = globalHeight / 2
    this.timePassed = random(0, starMaxNum)
    this.speed = random(this.orbitRadius) / 900000
    this.alpha = random(2, 10) / 10
  }

  draw() {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
    const twinkle = random(10) // 控制闪烁比例
    //实现闪烁的效果
    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    this.ctx.globalAlpha = this.alpha
    this.ctx.drawImage(starCanvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
    this.timePassed += this.speed // 控制旋转
  }
}

// 生成星星
const getStars = () => {
  const stars = []
  for (let i = 0; i < starMaxNum; i++) {
    stars[i] = new StarHandler(ctx)
  }
  return stars
}

// 执行动画
const start = () => {
  ctx.clearRect(0, 0, globalWidth, globalHeight)

  for (let i = 1; i < starMaxNum; i++) {
    stars[i].draw()
  }
  window.requestAnimationFrame(start)
}

// ----------- 实例化 -------------
const star = new Star(starCanvas, currentColor)
const stars = getStars()
start()

// =============== 数据：句子相关处理 ===============
// 改变句子颜色及内容
const changeWord = (sentence, color) => {
  const { r, g, b } = color
  // 渐入渐出
  $('#message').animate(
    {
      opacity: 0,
    },
    800,
    function () {
      $(this).animate(
        {
          opacity: 1,
        },
        800
      )
      $('#message .word').text(sentence)
      $('#message .word').css('text-shadow', `0 0 0.1rem rgba(${r},${g},${b},0.8)`)
    }
  )
}

// 假数据
const sentenceList = [
  '不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。',
  '步伐可以稍微慢一些，但一定要坚持下去。',
  '落日归山海，山海藏深意。',
  '人的欲望是没有尽头的。',
]
// 获取句子的逻辑，可以是api
const getSentence = list => {
  return list[random(0, sentenceList.length - 1)]
}
// 切换
const changeHandler = () => {
  const sentence = getSentence(sentenceList)
  const color = getActionColor(starColorList)
  // 文字
  changeWord(sentence, color)
  // 星星
  star.colorTransition(color)
}

// =========== 其他配置 =============

$(document).ready(() => {
  // 页面初始化
  changeHandler()
  // 切换按钮事件
  $('.change').click(() => {
    changeHandler()
  })
})
