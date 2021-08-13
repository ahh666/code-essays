> 个人思考和记录，代码内有相关注释，仅供一起学习。

## img-lazyload

图片懒加载，使用 `IntersectionObserver` 和 `滚动监听（加简单节流）` 两种方式实现

## draggable

[博客：JS实现拖拽元素交换位置](https://blog.csdn.net/AiHuanhuan110/article/details/114593251)

## deep-copy

深拷贝的思考和探索：JSON深拷贝 --> 普通深拷贝 --> 不会栈溢出的循环深拷贝

- 引用类型数据和数据类型
- 连续赋值的特性
- 栈

## 防抖、节流

[博客：JS节流(throttle)和防抖(debounce)的理解和实现](https://blog.csdn.net/AiHuanhuan110/article/details/89225819)

- 防抖：停止操作一个时间周期后，执行方法
- 节流：立即执行第一次，之后每隔一个时间周期触发一次方法，操作时间不足一个周期则不触发
- 节流升级：增加参数，用来决定是否执行最后一次未达到一个时间周期的动作，默认不执行

## CommonJs 和 ES Module

- 引入及使用方式和区别
  - 导入导出
  - 被引用模块对引用模块的值的影响
  - 声明提升
- 循环引用
  - 缓存
  - 引用逻辑



