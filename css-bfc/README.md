# CSS中的BFC

**源码示例：[code-essays/css-bfc](https://github.com/ahh666/code-essays/tree/main/css-bfc)**

## BFC 是什么

MDN对其的定义：

> 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

就是说：

> BFC 是页面中的一块独立的渲染区域，其内部元素的布局和样式与外部互不影响。可以与其他元素相互作用。 





## BFC 特性

1. 内部的Box会在垂直方向上一个接一个的放置（普通文档流）
2. 垂直方向上的距离由margin决定，属于同一个BFC的两个相邻的Box的margin会发生重叠（margin 塌陷现象）
3. BFC的区域不会与float的元素区域重叠（利用这一特性实现两栏三栏布局，也可禁止字体环绕）
4. 计算BFC的高度时，浮动元素也参与计算（可以让父元素被浮动元素高度撑开）
5. BFC就是页面上的一个独立容器，容器里面的子元素不会影响外面元素



## 如何创建 BFC

只要元素满足下面任一条件即可创建 BFC ：

- 根元素 `<html>`
- 设置元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`
- 设置元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`
- 设置元素的  [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block` 、`table-cell`、 `table-caption`
- 设置 [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 不为 `visible` 的块元素
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table`、`table-row`、 `table-row-group`、 `table-header-group`、`table-footer-group`（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
- 

新：

- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content `或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `flex` 或 `inline-flex `元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）



**PS：可 `display:inline-block` ，其只适用于IE6、7**



### 使用`display: flow-root`

一般使用 `overflow` 来创建一个新的 BFC，当使用这个属性只是为了创建 BFC 的时候，可能会出现一些不想要的问题，比如滚动条或者一些剪切的阴影。

现在使用 `display: flow-root` 即可创建无副作用的 BFC。



## 使用场景

结合源码示例：[code-essays/css-bfc](https://github.com/ahh666/code-essays/tree/main/css-bfc)

1. 两栏、三栏布局（方法：给固定宽度的元素设置浮动，给自适应宽度的元素设置BFC）
2. 处理margin塌陷（方法：给其中一个box外层包一层BFC元素）
3. 解决父元素无法被浮动元素高度撑开（方法：给父元素设置BFC）
4. 禁止文字环绕（方法：给出现文字环绕现象的元素设置BFC）



## 扩展

### `Box`, `Formatting context ` 的概念

#### Box

`Box`是CSS布局的基本单位， 也就是说一个页面是由很多个`Box`组成的。元素的类型和display属性，决定了这个`Box`的类型。 不同类型的`Box`， 会参与不同的`Formatting context`(一个决定如何渲染文档的容器)，因此`Box`内的元素会以不同的方式渲染：

- `block-level box`: display属性为block, list-item, table的元素，会生成`block-level box`。并且参与`block fomatting context`。
- `inline-level box`: display属性为inline, inline-block, inline-table的元素，会生成`inline-level box`。并且参与`inline formatting context`。
- `run-in box` : 实验性特性，根据父元素和兄弟元素的 Box 类型自动适应为以上两种。

#### Formatting context

`Formatting context`是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

最常见的`Formatting context`有`Block fomatting context`(简称`BFC`)和`Inline formatting context`(简称`IFC`)。

CSS2.1 中只有`BFC`和`IFC`, CSS3中增加了`GFC`和`FFC`

### Formatting context的种类

- Block fomatting context (BFC）：块级格式化上下文
- Inline formatting context (IFC）：行内格式化上下文
- Flex formatting context（FFC）：CSS3中的flex布局
- Grid formatting context（GFC）：CSS3中的Grid布局



