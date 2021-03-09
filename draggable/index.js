/*
 * @Description: 拖动实现代码及思路
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-09 11:02:22
 * @LastEditTime: 2021-03-09 14:52:36
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\draggable\index.js
 */

function dragHandler() {
  // 用来存取被拖动的元素
  let draggedNode = null
  let draggedNodeBg = null
  let dragEnterNodeBg = null
  // 获取可拖动节点
  const dragNodes = document.querySelectorAll('div[draggable="true"]')
  // 给可拖动节点绑定事件
  dragNodes.forEach(item => {
    item.ondragstart = () => {
      draggedNode = item
      draggedNodeBg = getComputedStyle(item).background
      item.style.background = '#bbb'
    }
    // 默认情况下,数据/元素不能在其他元素中被拖放,也就是会阻止你做drop操作，所以取消其默认行为
    item.ondragover = e => {
      e.preventDefault()
    }
    // 被拖动的节点，被释放后进行节点替换
    item.ondrop = e => {
      if (dragEnterNodeBg) {
        e.target.style.background = dragEnterNodeBg
      }
      if (draggedNode !== null && draggedNode !== item) {
        const temp = document.createElement('div')
        const dragBox = document.getElementById('drag-box')
        dragBox.replaceChild(temp, e.target)
        dragBox.replaceChild(e.target, draggedNode)
        dragBox.replaceChild(draggedNode, temp)
      }
    }
    // 样式交互
    item.ondragend = () => {
      item.style.background = draggedNodeBg
    }
    item.ondragenter = () => {
      if (item !== draggedNode) {
        dragEnterNodeBg = getComputedStyle(item).background
        item.style.background = 'darkcyan'
      }
    }
    item.ondragleave = () => {
      if (dragEnterNodeBg && item !== draggedNode) {
        item.style.background = dragEnterNodeBg
      }
    }
  })
}
dragHandler()
