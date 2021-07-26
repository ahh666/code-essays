function debounce(fn, wait = 0) {
  let timer = null
  return function () {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments)
    }, wait)
  }
}
