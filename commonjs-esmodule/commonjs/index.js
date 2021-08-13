/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-13 16:26:00
 * @LastEditTime: 2021-08-13 16:46:49
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\commonjs-esmodule\commonjs\index.js
 */

const a = require("./a");
console.log(111)
const b = require("./b");

console.log(a, "a");
console.log(b, "b");

/**
 * index.js => 引入 a，跳到 a.js
 * a.js => 【缓存 a.js】导出 a 为 1，引入 b.js， 跳到 b.js 。
 * b.js => 【缓存 b.js】导出 b 为 2，引入 a.js， 缓存中有 a.js， 不处理继续执行， 打印 { a: 1 } module b ，然后导出 b 为 22，b.js 执行完毕
 * 继续执行 a.js => 打印 { b: 22 } module a ，然后导出 a 为 2 ，a.js 执行完毕
 * 继续执行 index.js => 打印 111 ，引入 b.js ， 缓存中有 b.js ，不处理继续执行，打印 { a: 2 } a ，打印 { b: 22 } b
 */
