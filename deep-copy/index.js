/*
 * @Description: 深拷贝的思考和探索
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-07-27 17:21:10
 * @LastEditTime: 2021-07-30 17:43:57
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\deep-copy\index.js
 */

/**
 * @description: 最简单的深拷贝，会丢失函数和symbol类型属性，层级过深会导致栈溢出
 * @param {*} source
 * @return {*}
 */
function copyByJSON(source) {
  // 内部利用递归循环遍历，会爆栈
  return JSON.parse(JSON.stringify(source))
}

/**
 * @description: 普通深拷贝，层级过深会导致栈溢出
 * @param {*} source
 * @return {*} 
 */
function deepCopy(source) {
  if (!(typeof source === 'object' && source !== null)) {
    return source
  }
  const target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = deepCopy(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target
}

// 示例
const obj = {
  num: 1,
  str: 'b',
  bool: true,
  arr: [1, true, 'b', [1, 3, 4], { a: 1, b: 'b' }],
  func: function () {
    console.log(123)
  },
  obj1: {
    num: 1,
    str: 'b',
    bool: true,
    arr: [1, true, 'b', [1, 3, 4], { a: 1, b: 'b' }],
    func: function () {
      console.log(123)
    },
    obj2: { n: 33 }
  }
}
const objByJSON = copyByJSON(obj)
const deepCopyObj = deepCopy(obj)
const copyObj = obj

obj.newItem = 'i am new'

console.log(objByJSON)
console.log(deepCopyObj)
console.log(copyObj.newItem) // 'i am new'
console.log(deepCopyObj.newItem) // undefined

/**
 * @description: 循环深拷贝，通过循环代替递归，不会栈溢出
 * @param {*} source
 * @return {*}
 */
function cloneLoop(source) {
  if (!(typeof source === 'object' && source !== null)) {
    return source
  }
  const target = Array.isArray(source) ? [] : {}
  // 栈：存放需要深拷贝的数据
  // 先存入根节点数据
  const nodeList = [
    {
      parent: target,
      key: undefined,
      value: source
    }
  ]
  // 栈内没有数据则停止遍历
  while (nodeList.length > 0) {
    const node = nodeList.shift()
    const parent = node.parent
    const value = node.value
    const key = node.key

    // 没有 key 说明是根节点，有 key 说明是子节点
    let obj = parent
    if (key !== undefined) {
      // 利用连续赋值地址指向原理，指定父节点的引用地址
      obj = obj[key] = Array.isArray(value) ? [] : {}
    }

    for (const k in value) {
      if (Object.hasOwnProperty.call(value, k)) {
        if (typeof value[k] === 'object' && value !== null) {
          // 仍有引用类型数据，则将其放入栈内，继续执行深拷贝
          nodeList.push({
            parent: obj,
            key: k,
            value: value[k]
          })
        } else {
          obj[k] = value[k];
        }
      }
    }
  }
  return target
}

var cloneLoopObj = cloneLoop(obj)
console.log(cloneLoopObj)

/**
 * @description: 生成指定深度和每层广度的数据，用于测试数据
 * @param {*} deep 深度
 * @param {*} breadth 广度
 * @return {*}
 */
function createData(deep, breadth) {
  const data = {} // 引用地址的头
  let temp = data
  for (let i = 0; i < deep; i++) {
    temp = temp.data = {}
    // const obj = {}
    for (let j = 0; j < breadth; j++) {
      obj[j] = j
    }
    // temp.data = obj
    // temp = temp.data
  }
  return data
}

const deepData = createData(10000, 1)

// deepCopy(deepData) // Uncaught RangeError: Maximum call stack size exceeded ->栈溢出
cloneLoop(deepData)
