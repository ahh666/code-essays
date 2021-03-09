/*
 * @Description: 拖拽实现代码及思路
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-09 11:02:22
 * @LastEditTime: 2021-03-09 15:45:09
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\draggable\index.js
 */

function dragHandler() {
  // 用来存取被拖拽的节点
  let draggedNode = null
  // 存放被拖拽节点的背景
  let draggedNodeBg = null
  // 存放被拖拽节点进入的容器（节点） 的旧背景
  let dragEnterNodeBg = null
  // 获取可拖拽节点
  const dragNodes = document.querySelectorAll('div[draggable="true"]')
  // 给可拖拽节点绑定事件
  dragNodes.forEach(item => {
    item.ondragstart = () => {
      draggedNode = item
      // 拖拽开始，设置背景
      draggedNodeBg = getComputedStyle(item).background
      item.style.background = '#bbb'
    }
    // 默认情况下,数据/元素不能在其他元素中被拖放,也就是会阻止你做drop操作，所以取消其默认行为
    item.ondragover = e => {
      e.preventDefault()
    }
    // 被拖拽的节点，被释放后进行节点替换
    item.ondrop = e => {
      if (dragEnterNodeBg) {
        // 拖拽被释放，恢复目标节点背景
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
