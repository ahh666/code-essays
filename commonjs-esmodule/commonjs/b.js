/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-13 16:25:55
 * @LastEditTime: 2021-08-13 16:30:35
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\commonjs-esmodule\commonjs\b.js
 */

exports.b = 11;
var a = require("./a");
console.log(a, "module b");
exports.b = 22;